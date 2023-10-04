import { dataSource } from "../../../../services/DatabaseService";

import { CredentialModel } from "../../../../models/CredentialModel";

import { ListCredentialApiController } from "./ListCredentialApiController";
import { ListCredentialApiUseCase } from "./ListCredentialApiUseCase";

const credentialRepository = dataSource.getRepository(CredentialModel);

const listCredentialApiUseCase = new ListCredentialApiUseCase(
    credentialRepository
);
export const listCredentialApiController = new ListCredentialApiController(listCredentialApiUseCase);