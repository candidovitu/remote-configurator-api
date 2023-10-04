import { dataSource } from "../../../../services/DatabaseService";

import { NamespaceModel } from "../../../../models/NamespaceModel";

import { GetNamespaceApiController } from "./GetNamespaceApiController";
import { GetNamespaceApiUseCase } from "./GetNamespaceApiUseCase";

const namespaceRepository = dataSource.getRepository(NamespaceModel);

const getNamespaceApiUseCase = new GetNamespaceApiUseCase(
    namespaceRepository
);
export const getNamespaceApiController = new GetNamespaceApiController(getNamespaceApiUseCase);