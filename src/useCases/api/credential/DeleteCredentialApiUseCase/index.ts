import { dataSource } from "../../../../services/DatabaseService";

import { CredentialModel } from "../../../../models/CredentialModel";

import { DeleteCredentialApiController } from "./DeleteCredentialApiController";
import { DeleteCredentialApiUseCase } from "./DeleteCredentialApiUseCase";

const credentialRepository = dataSource.getRepository(CredentialModel);

const deleteCredentialApiUseCase = new DeleteCredentialApiUseCase(
    credentialRepository
);
export const deleteCredentialApiController = new DeleteCredentialApiController(deleteCredentialApiUseCase);