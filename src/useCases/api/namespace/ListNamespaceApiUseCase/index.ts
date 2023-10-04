import { dataSource } from "../../../../services/DatabaseService";

import { NamespaceModel } from "../../../../models/NamespaceModel";

import { ListNamespaceApiController } from "./ListNamespaceApiController";
import { ListNamespaceApiUseCase } from "./ListNamespaceApiUseCase";

const namespaceRepository = dataSource.getRepository(NamespaceModel);

const listNamespaceApiUseCase = new ListNamespaceApiUseCase(
    namespaceRepository
);
export const listNamespaceApiController = new ListNamespaceApiController(listNamespaceApiUseCase);