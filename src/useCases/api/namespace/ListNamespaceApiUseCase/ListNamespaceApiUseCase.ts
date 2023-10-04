import { FindManyOptions, Repository } from 'typeorm';

import { NamespaceModel } from '../../../../models/NamespaceModel';

import { NamespaceEntity } from '../../../../entities/NamespaceEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

import { PAGINATION_MAX_ITEMS } from '../../../../constants';

export class ListNamespaceApiUseCase implements UseCase {
    constructor(
        private namespaceRepository: Repository<NamespaceModel>
    ) {}

    handle = async (page: number, orderBy: string | null): Promise<UseCaseResponse> => {
        try {
            if(isNaN(page)) return { success: false, statusCode: 400, errors: [ { field: 'page', error: 'Page number is not valid' } ] }
            if(orderBy && ['asc', 'desc'].indexOf(orderBy) <= -1) return { success: false, statusCode: 400, errors: [ { field: 'orderBy', error: 'order is not valid' } ] }

            let findOptions: FindManyOptions<NamespaceModel> = {
                skip: (page <= 1 ? 0 : ((page * PAGINATION_MAX_ITEMS) - PAGINATION_MAX_ITEMS)),
                take: PAGINATION_MAX_ITEMS
            };

            if(orderBy) findOptions['order'] = {
                createdAt: orderBy == 'desc' ? 'desc' : 'asc'
            }

            const [foundNamespaces, namespacesCount] = await this.namespaceRepository.findAndCount(findOptions)

            const namespaces = foundNamespaces.map(namespace => new NamespaceEntity(namespace));

            return { success: true, data: {
                namespaces,
                pagination: {
                    totalCount: namespacesCount,
                    currentPage: page,
                    limit: PAGINATION_MAX_ITEMS,
                    pagesCount: Math.ceil(namespacesCount / PAGINATION_MAX_ITEMS)
                }
            } };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}