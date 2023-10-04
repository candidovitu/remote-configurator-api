import { Repository } from 'typeorm';
import crypto from 'crypto';

import { CredentialModel } from '../../../../models/CredentialModel';

import { CredentialEntity } from '../../../../entities/CredentialEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class CreateCredentialApiUseCase implements UseCase {
    constructor(
        private credentialRepository: Repository<CredentialModel>
    ) {}

    handle = async (name: string): Promise<UseCaseResponse> => {
        try {
            const accessKey = crypto.randomBytes(12).toString('hex');
            const secretKey = crypto.randomBytes(72).toString('hex');

            const credentialEntity = new CredentialEntity({
                name,
                accessKey,
                secretKey,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            const encryptedSecretKey = credentialEntity.getEncryptedSecretKey();

            await this.credentialRepository.insert({
                ...credentialEntity,
                secretKey: encryptedSecretKey
            });

            return { success: true, data: { name, accessKey, secretKey } };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}