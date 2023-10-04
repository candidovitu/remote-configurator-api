import { dataSource } from "../../../../services/DatabaseService";

import { NamespaceModel } from "../../../../models/NamespaceModel";

import { UpdateNamespaceApiController } from "./UpdateNamespaceApiController";
import { UpdateNamespaceApiUseCase } from "./UpdateNamespaceApiUseCase";

const namespaceRepository = dataSource.getRepository(NamespaceModel);

const updateNamespaceApiUseCase = new UpdateNamespaceApiUseCase(
    namespaceRepository
);
export const updateNamespaceApiController = new UpdateNamespaceApiController(updateNamespaceApiUseCase);