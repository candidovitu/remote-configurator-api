import { dataSource } from "../../../../services/DatabaseService";

import { UserModel } from "../../../../models/UserModel";

import { ListUserApiController } from "./ListUserApiController";
import { ListUserApiUseCase } from "./ListUserApiUseCase";

const userRepository = dataSource.getRepository(UserModel);

const listUserApiUseCase = new ListUserApiUseCase(
    userRepository
);
export const listUserApiController = new ListUserApiController(listUserApiUseCase);