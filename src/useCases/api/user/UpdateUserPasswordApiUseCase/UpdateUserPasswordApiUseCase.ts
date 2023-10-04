import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

import { UserModel } from '../../../../models/UserModel';

import { UserEntity } from '../../../../entities/UserEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class UpdateUserPasswordApiUseCase implements UseCase {
    constructor(
        private userRepository: Repository<UserModel>
    ) {}

    handle = async (id: string, currentPassword: string, newPassword: string): Promise<UseCaseResponse> => {
        try {
            const foundUser = await this.userRepository.findOne({
                where: { _id: new ObjectId(id) },
                select: ['password']
            });

            if(!foundUser) return { success: false, statusCode: 404, errors: [ { field: 'id', error: `User id '${id}' not found` }] }

            const user = new UserEntity(foundUser);

            const currentPasswordIsValid = user.validatePassword(currentPassword);
            if(!currentPasswordIsValid) return { success: false, statusCode: 401, errors: [ { field: 'currentPassword', error: `The current password is wrong` }] }

            const newPasswordEncrypted = user.encryptPassword(newPassword);

            user.updatedAt = new Date();

            await this.userRepository.update({ _id: new ObjectId(id) }, {
                password: newPasswordEncrypted
            });

            return { success: true };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}