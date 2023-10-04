import { Repository } from 'typeorm';

import { CredentialModel } from '../../../../models/CredentialModel';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

import { disconnectAllAccessKeyClients } from '../../../../data/WebSocketData';

export class DeleteCredentialApiUseCase implements UseCase {
    constructor(
        private credentialRepository: Repository<CredentialModel>
    ) {}

    handle = async (accessKey: string): Promise<UseCaseResponse> => {
        try {
            const deleteResult = await this.credentialRepository.delete({ accessKey });

            if(!deleteResult.affected) return { success: false, statusCode: 404, errors: [ { field: 'accessKey', error: `Credential access key '${accessKey}' not found` }] }

            disconnectAllAccessKeyClients(accessKey);

            return { success: true };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}