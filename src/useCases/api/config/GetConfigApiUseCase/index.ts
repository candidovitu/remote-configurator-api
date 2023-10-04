import { dataSource } from "../../../../services/DatabaseService";

import { ConfigModel } from "../../../../models/ConfigModel";

import { GetConfigApiController } from "./GetConfigApiController";
import { GetConfigApiUseCase } from "./GetConfigApiUseCase";

const configRepository = dataSource.getRepository(ConfigModel);

const getConfigApiUseCase = new GetConfigApiUseCase(
    configRepository
);
export const getConfigApiController = new GetConfigApiController(getConfigApiUseCase);