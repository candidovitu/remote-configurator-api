import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import { dataSource } from '../services/DatabaseService';
import { logger } from '../services/LoggerService';

import { SessionModel } from '../models/SessionModel';
import { UserModel } from '../models/UserModel';

import { UserEntity } from '../entities/UserEntity';

const log = logger.child({
    module: 'UserSessionMiddleware'
});

const sessionRepository = dataSource.getRepository(SessionModel);
const userRepository = dataSource.getRepository(UserModel);

const {
    DEFAULT_ADMIN_EMAIL
} = process.env;

const UserSessionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sessiontoken: sessionToken } = req.headers;
        if(!sessionToken) return res.status(400).json({ message: 'Missing session token header' });

        const foundSession = await sessionRepository.findOneBy({ token: String(sessionToken) });
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
        log.error('Failed to authenticate user', err);

        res.status(500).json({
            message: 'Failed to validate user session',
            errors: []
        });
    }
}

export default UserSessionMiddleware;