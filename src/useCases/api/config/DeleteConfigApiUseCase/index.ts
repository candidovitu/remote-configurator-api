import { dataSource } from "../../../../services/DatabaseService";

import { ConfigModel } from "../../../../models/ConfigModel";

import { DeleteConfigApiController } from "./DeleteConfigApiController";
import { DeleteConfigApiUseCase } from "./DeleteConfigApiUseCase";

const configRepository = dataSource.getRepository(ConfigModel);

const deleteConfigApiUseCase = new DeleteConfigApiUseCase(
    configRepository
);
export const deleteConfigApiController = new DeleteConfigApiController(deleteConfigApiUseCase);