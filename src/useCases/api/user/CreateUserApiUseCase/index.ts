import { dataSource } from "../../../../services/DatabaseService";

import { UserModel } from "../../../../models/UserModel";

import { CreateUserApiController } from "./CreateUserApiController";
import { CreateUserApiUseCase } from "./CreateUserApiUseCase";

const userRepository = dataSource.getRepository(UserModel);

const createUserApiUseCase = new CreateUserApiUseCase(
    userRepository
);
export const createUserApiController = new CreateUserApiController(createUserApiUseCase);