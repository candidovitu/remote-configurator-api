import { Repository } from 'typeorm';
import crypto from 'crypto';

import { UserModel } from '../../../../models/UserModel';
import { SessionModel } from "../../../../models/SessionModel";

import { UserEntity } from '../../../../entities/UserEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

const {
    DEFAULT_ADMIN_EMAIL,
    DEFAULT_ADMIN_PASSWORD
} = process.env;

export class ValidateUserApiUseCase implements UseCase {
    constructor(
        private userRepository: Repository<UserModel>,
        private sessionRepository: Repository<SessionModel>
    ) {}

    handle = async (email: string, password: string): Promise<UseCaseResponse> => {
        try {
            let userId: string;
            let authUser: UserEntity | null = null;

            if(email == DEFAULT_ADMIN_EMAIL && password == DEFAULT_ADMIN_PASSWORD) {
                userId = 'admin';
                authUser = new UserEntity({
                    username: 'admin',
                    email: DEFAULT_ADMIN_EMAIL,
                    active: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            } else {
                const foundUser = await this.userRepository.findOneBy({ email });
                if(!foundUser) return { success: false, statusCode: 404, errors: [ { field: 'email', error: `User email '${email}' not found` }] }
    
                const user = new UserEntity(foundUser);
    
                const isValidPassword = user.validatePassword(password);
                if(!isValidPassword) return { success: false, statusCode: 401, errors: [ { field: 'password', error: `The password is wrong` }] }

                userId = foundUser._id.toString();
                authUser = user;
            }

            if(authUser) {
                const generatedToken = crypto.randomBytes(64).toString('hex');;

                await this.sessionRepository.insert({ userId: userId, token: generatedToken });
    
                if(authUser.password) delete authUser.password;
    
                return { success: true, data: {
                    user: authUser,
                    session: {
                        token: generatedToken
                    }
                } };
            }

            return { success: false }
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}