import { Repository } from 'typeorm';

import { NamespaceModel } from '../../../../models/NamespaceModel';

import { NamespaceEntity } from '../../../../entities/NamespaceEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class GetNamespaceApiUseCase implements UseCase {
    constructor(
        private namespaceRepository: Repository<NamespaceModel>
    ) {}

    handle = async (name: string): Promise<UseCaseResponse> => {
        try {
            const foundNamespace = await this.namespaceRepository.findOneBy({ name });

            if(!foundNamespace) return { success: false, statusCode: 404, errors: [ { field: 'name', error: `Namespace '${name}' not found` }] }

            const namespace = new NamespaceEntity(foundNamespace);

            return { success: true, data: namespace };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}