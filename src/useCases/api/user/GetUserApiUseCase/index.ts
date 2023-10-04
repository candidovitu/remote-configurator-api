import { dataSource } from "../../../../services/DatabaseService";

import { UserModel } from "../../../../models/UserModel";

import { GetUserApiController } from "./GetUserApiController";
import { GetUserApiUseCase } from "./GetUserApiUseCase";

const userRepository = dataSource.getRepository(UserModel);

const getUserApiUseCase = new GetUserApiUseCase(
    userRepository
);
export const getUserApiController = new GetUserApiController(getUserApiUseCase);