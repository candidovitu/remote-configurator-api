import { dataSource } from "../../../../services/DatabaseService";

import { CredentialModel } from "../../../../models/CredentialModel";

import { CreateCredentialApiController } from "./CreateCredentialApiController";
import { CreateCredentialApiUseCase } from "./CreateCredentialApiUseCase";

const credentialRepository = dataSource.getRepository(CredentialModel);

const createCredentialApiUseCase = new CreateCredentialApiUseCase(
    credentialRepository
);
export const createCredentialApiController = new CreateCredentialApiController(createCredentialApiUseCase);