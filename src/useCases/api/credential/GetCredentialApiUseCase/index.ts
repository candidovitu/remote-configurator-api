import { dataSource } from "../../../../services/DatabaseService";

import { CredentialModel } from "../../../../models/CredentialModel";

import { GetCredentialApiController } from "./GetCredentialApiController";
import { GetCredentialApiUseCase } from "./GetCredentialApiUseCase";

const credentialRepository = dataSource.getRepository(CredentialModel);

const getCredentialApiUseCase = new GetCredentialApiUseCase(
    credentialRepository
);
export const getCredentialApiController = new GetCredentialApiController(getCredentialApiUseCase);