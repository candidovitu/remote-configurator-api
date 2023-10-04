import { dataSource } from "../../../../services/DatabaseService";

import { ConfigModel } from "../../../../models/ConfigModel";

import { CreateConfigApiController } from "./CreateConfigApiController";
import { CreateConfigApiUseCase } from "./CreateConfigApiUseCase";

const configRepository = dataSource.getRepository(ConfigModel);

const createConfigApiUseCase = new CreateConfigApiUseCase(
    configRepository
);
export const createConfigApiController = new CreateConfigApiController(createConfigApiUseCase);