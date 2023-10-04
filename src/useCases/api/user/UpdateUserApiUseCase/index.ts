import { dataSource } from "../../../../services/DatabaseService";

import { UserModel } from "../../../../models/UserModel";

import { UpdateUserApiController } from "./UpdateUserApiController";
import { UpdateUserApiUseCase } from "./UpdateUserApiUseCase";

const userRepository = dataSource.getRepository(UserModel);

const updateUserApiUseCase = new UpdateUserApiUseCase(
    userRepository
);
export const updateUserApiController = new UpdateUserApiController(updateUserApiUseCase);