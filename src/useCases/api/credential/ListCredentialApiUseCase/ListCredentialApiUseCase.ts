import { FindManyOptions, Repository } from 'typeorm';

import { CredentialModel } from '../../../../models/CredentialModel';

import { CredentialEntity } from '../../../../entities/CredentialEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

import { PAGINATION_MAX_ITEMS } from '../../../../constants';

export class ListCredentialApiUseCase implements UseCase {
    constructor(
        private credentialRepository: Repository<CredentialModel>
    ) {}

    handle = async (page: number, orderBy: string | null): Promise<UseCaseResponse> => {
        try {
            if(isNaN(page)) return { success: false, statusCode: 400, errors: [ { field: 'page', error: 'Page number is not valid' } ] }
            if(orderBy && ['asc', 'desc'].indexOf(orderBy) <= -1) return { success: false, statusCode: 400, errors: [ { field: 'orderBy', error: 'order is not valid' } ] }
            
            let findOptions: FindManyOptions<CredentialModel> = {
                skip: (page <= 1 ? 0 : ((page * PAGINATION_MAX_ITEMS) - PAGINATION_MAX_ITEMS)),
                take: PAGINATION_MAX_ITEMS,
                select: [ 'accessKey', 'name', 'createdAt', 'updatedAt' ]
            };

            if(orderBy) findOptions['order'] = {
                createdAt: orderBy == 'desc' ? 'desc' : 'asc'
            }

            const [foundCredentials, credentialsCount] = await this.credentialRepository.findAndCount(findOptions)

            const credentials = foundCredentials.map(credential => new CredentialEntity(credential));

            return { success: true, data: {
                credentials,
                pagination: {
                    totalCount: credentialsCount,
                    currentPage: page,
                    limit: PAGINATION_MAX_ITEMS,
                    pagesCount: Math.ceil(credentialsCount / PAGINATION_MAX_ITEMS)
                }
            } };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}