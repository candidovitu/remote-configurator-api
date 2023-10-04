import { dataSource } from "../../../../services/DatabaseService";

import { NamespaceModel } from "../../../../models/NamespaceModel";

import { CreateNamespaceApiController } from "./CreateNamespaceApiController";
import { CreateNamespaceApiUseCase } from "./CreateNamespaceApiUseCase";

const namespaceRepository = dataSource.getRepository(NamespaceModel);

const createNamespaceApiUseCase = new CreateNamespaceApiUseCase(
    namespaceRepository
);
export const createNamespaceApiController = new CreateNamespaceApiController(createNamespaceApiUseCase);