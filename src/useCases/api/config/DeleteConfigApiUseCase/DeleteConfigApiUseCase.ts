import { Repository } from 'typeorm';

import { ConfigModel } from '../../../../models/ConfigModel';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class DeleteConfigApiUseCase implements UseCase {
    constructor(
        private configRepository: Repository<ConfigModel>
    ) {}

    handle = async (namespace: string, key: string): Promise<UseCaseResponse> => {
        try {
            const deleteResult = await this.configRepository.delete({ namespace, key });

            if(!deleteResult.raw.deletedCount) return { success: false, statusCode: 404, errors: [ { field: 'key', error: `Key '${key}' not found on '${namespace}' namespace` } ] };

            return { success: true };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}