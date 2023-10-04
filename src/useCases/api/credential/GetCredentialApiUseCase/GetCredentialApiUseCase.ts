import { FindManyOptions, Repository } from 'typeorm';

import { CredentialModel } from '../../../../models/CredentialModel';

import { CredentialEntity } from '../../../../entities/CredentialEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class GetCredentialApiUseCase implements UseCase {
    constructor(
        private credentialRepository: Repository<CredentialModel>
    ) {}

    handle = async (accessKey: string): Promise<UseCaseResponse> => {
        try {
            const foundCredential = await this.credentialRepository.findOneBy({ accessKey });

            if(!foundCredential) return { success: false, statusCode: 404, errors: [ { field: 'accessKey', error: `Credential access key '${accessKey}' not found` }] }

            const credential = new CredentialEntity(foundCredential);

            delete credential.secretKey;

            return { success: true, data: credential };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}