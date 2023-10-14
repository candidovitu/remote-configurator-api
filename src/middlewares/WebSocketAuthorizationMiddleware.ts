import { Request, NextFunction } from 'express';

import { dataSource } from '../services/DatabaseService';
import { logger } from '../services/LoggerService';

import { CredentialEntity } from '../entities/CredentialEntity';
import { WebSocketEntity } from '../entities/WebSocketEntity';

import { CredentialModel } from '../models/CredentialModel';

const log = logger.child({
    module: 'WebSocketAuthorizationMiddleware'
});

const credentialRepository = dataSource.getRepository(CredentialModel);

const WebSocketAuthorizationMiddleware = async (ws: WebSocketEntity, req: Request, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if(!authorization) return ws.close(1000, 'Missing authorization header');
    
        const authorizationParts = authorization.split(' ');
        if(authorizationParts.length < 2) return ws.close(1000, 'Invalid authorization data');

        const rawCredential = authorizationParts[1];

        const mountedCredential = Buffer.from(rawCredential, 'base64').toString('utf-8');

        const credentialParts = mountedCredential.split(':');
        if(credentialParts.length < 2) return ws.close(1000, 'Invalid authorization credential value format');

        const accessKey = credentialParts[0];
        const secretKey = credentialParts[1];

        const foundCredential = await credentialRepository.findOneBy({ accessKey: String(accessKey) });
        if(!foundCredential) return ws.close(1000, 'Credential not found')
        
        const credential = new CredentialEntity(foundCredential);

        const isCredentialSecretKeyValid = credential.validateSecretKey(String(secretKey));
        if(!isCredentialSecretKeyValid) return ws.close(1000, 'Wrong credential secret key')

        delete credential.secretKey;

        req.credential = credential;
        ws.credential = credential;

        next();
    } catch (err: any) {
        log.error('Failed to authenticate credential', err);

        return ws.close(1000, 'failed to authenticate credential');
    }
}

export default WebSocketAuthorizationMiddleware;