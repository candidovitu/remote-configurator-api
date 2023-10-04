import { dataSource } from "../../../../services/DatabaseService";

import { UserModel } from "../../../../models/UserModel";

import { UpdateUserPasswordApiController } from "./UpdateUserPasswordApiController";
import { UpdateUserPasswordApiUseCase } from "./UpdateUserPasswordApiUseCase";

const userRepository = dataSource.getRepository(UserModel);

const updateUserPasswordApiUseCase = new UpdateUserPasswordApiUseCase(
    userRepository
);
export const updateUserPasswordApiController = new UpdateUserPasswordApiController(updateUserPasswordApiUseCase);