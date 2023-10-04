import { Repository } from 'typeorm';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import { NamespaceModel } from '../../../../models/NamespaceModel';
import { ConfigModel } from '../../../../models/ConfigModel';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class DeleteNamespaceApiUseCase implements UseCase {
    constructor(
        private namespaceRepository: Repository<NamespaceModel>,
        private configRepository: Repository<ConfigModel>
    ) {}

    handle = async (name: string): Promise<UseCaseResponse> => {
        try {
            const [namespaceDependents, namespaceDependentsCount] = await this.configRepository.findAndCountBy({ namespace: name });
            const dependentsNames = namespaceDependents
            .map(config => config.key)
            .join(', ');

            if(namespaceDependentsCount > 0) return { success: false, statusCode: 409, errors: [ { field: null, error: `Namespace cannot be deleted because have dependents: ${dependentsNames}` }] }

            const deleteResult = await this.namespaceRepository.delete({ name });

            if(!deleteResult.affected) return { success: false, statusCode: 404, errors: [ { field: 'name', error: `Namespace '${name}' not found` }] }

            return { success: true };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}