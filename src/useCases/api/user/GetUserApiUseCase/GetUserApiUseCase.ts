import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

import { UserModel } from '../../../../models/UserModel';

import { UserEntity } from '../../../../entities/UserEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class GetUserApiUseCase implements UseCase {
    constructor(
        private userRepository: Repository<UserModel>
    ) {}

    handle = async (id: string): Promise<UseCaseResponse> => {
        try {
            const foundUser = await this.userRepository.findOne({
                where: { _id: new ObjectId(id) },
                select: [ '_id', 'username', 'email', 'active', 'createdAt', 'updatedAt' ]
            });

            if(!foundUser) return { success: false, statusCode: 404, errors: [ { field: 'id', error: `User id '${id}' not found` }] }

            const user = new UserEntity(foundUser);

            return { success: true, data: user };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}