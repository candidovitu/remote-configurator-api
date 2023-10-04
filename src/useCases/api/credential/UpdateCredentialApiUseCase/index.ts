import { dataSource } from "../../../../services/DatabaseService";

import { CredentialModel } from "../../../../models/CredentialModel";

import { UpdateCredentialApiController } from "./UpdateCredentialApiController";
import { UpdateCredentialApiUseCase } from "./UpdateCredentialApiUseCase";

const credentialRepository = dataSource.getRepository(CredentialModel);

const updateCredentialApiUseCase = new UpdateCredentialApiUseCase(
    credentialRepository
);
export const updateCredentialApiController = new UpdateCredentialApiController(updateCredentialApiUseCase);