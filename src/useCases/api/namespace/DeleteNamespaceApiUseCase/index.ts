import { dataSource } from "../../../../services/DatabaseService";

import { NamespaceModel } from "../../../../models/NamespaceModel";
import { ConfigModel } from "../../../../models/ConfigModel";

import { DeleteNamespaceApiController } from "./DeleteNamespaceApiController";
import { DeleteNamespaceApiUseCase } from "./DeleteNamespaceApiUseCase";

const namespaceRepository = dataSource.getRepository(NamespaceModel);
const configRepository = dataSource.getRepository(ConfigModel);

const deleteNamespaceApiUseCase = new DeleteNamespaceApiUseCase(
    namespaceRepository,
    configRepository
);
export const deleteNamespaceApiController = new DeleteNamespaceApiController(deleteNamespaceApiUseCase);