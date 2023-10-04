import { Repository } from 'typeorm';

import { CredentialModel } from '../../../../models/CredentialModel';

import { CredentialEntity } from '../../../../entities/CredentialEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class UpdateCredentialApiUseCase implements UseCase {
    constructor(
        private credentialRepository: Repository<CredentialModel>
    ) {}

    handle = async (credential: CredentialEntity): Promise<UseCaseResponse> => {
        try {
            credential.updatedAt = new Date();

            const updateResult = await this.credentialRepository.update(
                { accessKey: credential.accessKey },
                {
                    name: credential.name,
                    updatedAt: credential.updatedAt
                }
            );

            if(!updateResult.raw.matchedCount) return { success: false, statusCode: 404, errors: [ { field: 'accessKey', error: `Credential access key '${credential.accessKey}' not found` } ] };

            return { success: true };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}