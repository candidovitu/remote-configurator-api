import { Repository } from 'typeorm';

import { NamespaceModel } from '../../../../models/NamespaceModel';

import { NamespaceEntity } from '../../../../entities/NamespaceEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class UpdateNamespaceApiUseCase implements UseCase {
    constructor(
        private namespaceRepository: Repository<NamespaceModel>
    ) {}

    handle = async (namespace: NamespaceEntity): Promise<UseCaseResponse> => {
        try {
            namespace.updatedAt = new Date();
            
            const updateResult = await this.namespaceRepository.update({ name: namespace.name }, namespace);
            
            if(!updateResult.raw.matchedCount) return { success: false, statusCode: 404, errors: [ { field: 'name', error: `Namespace '${namespace.name}' not found` } ] };
            
            return { success: true };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}