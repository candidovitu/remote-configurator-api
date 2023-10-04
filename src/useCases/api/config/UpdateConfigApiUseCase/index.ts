import { dataSource } from "../../../../services/DatabaseService";

import { ConfigModel } from "../../../../models/ConfigModel";

import { UpdateConfigApiController } from "./UpdateConfigApiController";
import { UpdateConfigApiUseCase } from "./UpdateConfigApiUseCase";

const configRepository = dataSource.getRepository(ConfigModel);

const updateConfigApiUseCase = new UpdateConfigApiUseCase(
    configRepository
);
export const updateConfigApiController = new UpdateConfigApiController(updateConfigApiUseCase);