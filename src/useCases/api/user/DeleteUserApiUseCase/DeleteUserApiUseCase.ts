import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

import { UserModel } from '../../../../models/UserModel';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class DeleteUserApiUseCase implements UseCase {
    constructor(
        private userRepository: Repository<UserModel>
    ) {}

    handle = async (id: string): Promise<UseCaseResponse> => {
        try {
            const deleteResult = await this.userRepository.delete({ _id: new ObjectId(id) });

            if(!deleteResult.affected) return { success: false, statusCode: 404, errors: [ { field: 'id', error: `User id '${id}' not found` }] }

            return { success: true };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}