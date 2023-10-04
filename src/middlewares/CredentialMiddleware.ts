import { Request, NextFunction } from 'express';

import { dataSource } from '../services/DatabaseService';
import { logger } from '../services/LoggerService';

import { CredentialEntity } from '../entities/CredentialEntity';
import { WebSocketEntity } from '../entities/WebSocketEntity';

import { CredentialModel } from '../models/CredentialModel';

const log = logger.child({
    module: 'CredentialMiddleware'
});

const credentialRepository = dataSource.getRepository(CredentialModel);

const CredentialMiddleware = async (ws: WebSocketEntity, req: Request, next: NextFunction) => {
    try {
        const {
            accesskey: accessKey,
            secretkey: secretKey            
        } = req.headers;

        if(!accessKey || !secretKey) return ws.close(1000, 'Missing accesskey or secretkey headers');
        
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

export default CredentialMiddleware;