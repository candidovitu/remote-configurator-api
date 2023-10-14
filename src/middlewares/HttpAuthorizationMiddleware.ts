import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import { dataSource } from '../services/DatabaseService';
import { logger } from '../services/LoggerService';

import { SessionModel } from '../models/SessionModel';
import { UserModel } from '../models/UserModel';
import { CredentialModel } from '../models/CredentialModel';

import { UserEntity } from '../entities/UserEntity';
import { CredentialEntity } from '../entities/CredentialEntity';

const log = logger.child({
    module: 'HttpAuthorizationMiddleware'
});

const sessionRepository = dataSource.getRepository(SessionModel);
const userRepository = dataSource.getRepository(UserModel);

const {
    DEFAULT_ADMIN_EMAIL
} = process.env;

const credentialRepository = dataSource.getRepository(CredentialModel);

const HttpAuthorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if(!authorization) return res.status(401).json({ message: 'Missing authorization header' });

    const authorizationParts = authorization.split(' ');
    if(authorizationParts.length < 2) return res.status(400).json({ message: 'Invalid authorization data' });

    const authorizationType = authorizationParts[0];
    const authorizationValue = authorizationParts[1];

    if(authorizationType == 'Bearer') return UserAuthorizationMiddleware(authorizationValue, req, res, next);
    else if(authorizationType == 'Credential') return CredentialAuthorizationMiddleware(authorizationValue, req, res, next);
    else return res.status(400).json({ message: 'Invalid authorization type' });
}

const CredentialAuthorizationMiddleware = async (rawCredential: string, req: Request, res: Response, next: NextFunction) => {
    try {
        const mountedCredential = Buffer.from(rawCredential, 'base64').toString('utf-8');

        const credentialParts = mountedCredential.split(':');
        if(credentialParts.length < 2) return res.status(400).json({ message: 'Invalid authorization credential value format' });

        const accessKey = credentialParts[0];
        const secretKey = credentialParts[1];

        const foundCredential = await credentialRepository.findOneBy({ accessKey: String(accessKey) });
        if(!foundCredential) return res.status(401).json({ message: 'Credential not found' });
        
        const credential = new CredentialEntity(foundCredential);

        const isCredentialSecretKeyValid = credential.validateSecretKey(String(secretKey));
        if(!isCredentialSecretKeyValid) return res.status(401).json({ message: 'Wrong credential secret key' });

        const user = new UserEntity({
            username: `credential-access-key-${accessKey}`,
            email: '',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        req.user = credential;

        next();
    } catch (err: any) {
        log.error('Failed to authorize credential', err);

        res.status(500).json({
            message: 'Failed to authorize credential',
            errors: []
        });
    }
}

const UserAuthorizationMiddleware = async (sessionToken: string, req: Request, res: Response, next: NextFunction) => {
    try {
        const foundSession = await sessionRepository.findOneBy({ token: sessionToken });
        if(!foundSession) return res.status(401).json({ message: 'Session token not found' });

        const isDefaultAdminSession = (foundSession.userId === 'admin');

        let user: UserEntity | null = null;

        if(isDefaultAdminSession) {
            user = new UserEntity({
                username: 'admin',
                email: String(DEFAULT_ADMIN_EMAIL),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        } else {
            const foundUser = await userRepository.findOne({
                where: { _id: new ObjectId(foundSession.userId) },
                select: ['username', 'email', 'active']
            });
            if(!foundUser) return res.status(401).json({ message: 'User not found' });
    
            user = new UserEntity(foundUser);
        }

        if(!user) throw new Error(`Cannot set session user (userId: ${foundSession.userId})`);

        req.user = user;

        next();
    } catch (err: any) {
        log.error('Failed to authorize user', err);

        res.status(500).json({
            message: 'Failed to validate user session',
            errors: []
        });
    }
}

export default HttpAuthorizationMiddleware;