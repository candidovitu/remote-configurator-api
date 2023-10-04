import { dataSource } from "../../../../services/DatabaseService";

import { ConfigModel } from "../../../../models/ConfigModel";

import { ListConfigApiController } from "./ListConfigApiController";
import { ListConfigApiUseCase } from "./ListConfigApiUseCase";

const configRepository = dataSource.getRepository(ConfigModel);

const listConfigApiUseCase = new ListConfigApiUseCase(
    configRepository
);
export const listConfigApiController = new ListConfigApiController(listConfigApiUseCase);