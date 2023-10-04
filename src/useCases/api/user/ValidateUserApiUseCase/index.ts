import { dataSource } from "../../../../services/DatabaseService";

import { UserModel } from "../../../../models/UserModel";
import { SessionModel } from "../../../../models/SessionModel";

import { ValidateUserApiController } from "./ValidateUserApiController";
import { ValidateUserApiUseCase } from "./ValidateUserApiUseCase";

const userRepository = dataSource.getRepository(UserModel);
const sessionRepository = dataSource.getRepository(SessionModel);

const validateUserApiUseCase = new ValidateUserApiUseCase(
    userRepository,
    sessionRepository
);
export const validateUserApiController = new ValidateUserApiController(validateUserApiUseCase);