import { dataSource } from "../../../../services/DatabaseService";

import { UserModel } from "../../../../models/UserModel";

import { DeleteUserApiController } from "./DeleteUserApiController";
import { DeleteUserApiUseCase } from "./DeleteUserApiUseCase";

const userRepository = dataSource.getRepository(UserModel);

const deleteUserApiUseCase = new DeleteUserApiUseCase(
    userRepository
);
export const deleteUserApiController = new DeleteUserApiController(deleteUserApiUseCase);