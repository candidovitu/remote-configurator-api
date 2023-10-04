import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

import { UserModel } from '../../../../models/UserModel';

import { UserEntity } from '../../../../entities/UserEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class UpdateUserApiUseCase implements UseCase {
    constructor(
        private userRepository: Repository<UserModel>
    ) {}

    handle = async (id: string, user: UserEntity): Promise<UseCaseResponse> => {
        try {
            delete user.password;
            
            user.updatedAt = new Date();

            await this.userRepository.update({ _id: new ObjectId(id) }, user);
            
            return { success: true };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}