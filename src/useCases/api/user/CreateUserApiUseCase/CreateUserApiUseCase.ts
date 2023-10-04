import { Repository } from 'typeorm';

import { UserModel } from '../../../../models/UserModel';

import { UserEntity } from '../../../../entities/UserEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class CreateUserApiUseCase implements UseCase {
    constructor(
        private userRepository: Repository<UserModel>
    ) {}


    handle = async (user: UserEntity): Promise<UseCaseResponse> => {
        try {
            const encryptedPassword = user.getEncryptedPassword();

            user.createdAt = new Date();
            user.updatedAt = new Date();

            await this.userRepository.insert({
                ...user,
                password: encryptedPassword
            });

            return { success: true };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}