import { MongoServerError, Repository } from 'typeorm';

import { NamespaceModel } from '../../../../models/NamespaceModel';

import { NamespaceEntity } from '../../../../entities/NamespaceEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class CreateNamespaceApiUseCase implements UseCase {
    constructor(
        private namespaceRepository: Repository<NamespaceModel>
    ) {}

    handle = async (namespace: NamespaceEntity): Promise<UseCaseResponse> => {
        try {
            namespace.createdAt = new Date();
            namespace.updatedAt = new Date();

            await this.namespaceRepository.insert(namespace);
            
            return { success: true };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}