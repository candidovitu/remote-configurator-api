import { FindManyOptions, Repository } from 'typeorm';

import { UserModel } from '../../../../models/UserModel';

import { UserEntity } from '../../../../entities/UserEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

import { PAGINATION_MAX_ITEMS } from '../../../../constants';

export class ListUserApiUseCase implements UseCase {
    constructor(
        private userRepository: Repository<UserModel>
    ) {}

    handle = async (page: number, orderBy: string | null): Promise<UseCaseResponse> => {
        try {
            if(isNaN(page)) return { success: false, statusCode: 400, errors: [ { field: 'page', error: 'Page number is not valid' } ] }
            if(orderBy && ['asc', 'desc'].indexOf(orderBy) <= -1) return { success: false, statusCode: 400, errors: [ { field: 'orderBy', error: 'order is not valid' } ] }
            
            let findOptions: FindManyOptions<UserModel> = {
                skip: (page <= 1 ? 0 : ((page * PAGINATION_MAX_ITEMS) - PAGINATION_MAX_ITEMS)),
                take: PAGINATION_MAX_ITEMS,
                select: [ '_id', 'username', 'email', 'active', 'createdAt', 'updatedAt' ]
            };

            if(orderBy) findOptions['order'] = {
                createdAt: orderBy == 'desc' ? 'desc' : 'asc'
            }

            const [foundUsers, usersCount] = await this.userRepository.findAndCount(findOptions)

            const users = foundUsers.map(user => new UserEntity(user));

            return { success: true, data: {
                users,
                pagination: {
                    totalCount: usersCount,
                    currentPage: page,
                    limit: PAGINATION_MAX_ITEMS,
                    pagesCount: Math.ceil(usersCount / PAGINATION_MAX_ITEMS)
                }
            } };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}