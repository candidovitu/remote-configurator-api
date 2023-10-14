import { Router } from 'express';

import { getCredentialApiController } from '../useCases/api/credential/GetCredentialApiUseCase';
import { listCredentialApiController } from '../useCases/api/credential/ListCredentialApiUseCase';
import { createCredentialApiController } from '../useCases/api/credential/CreateCredentialApiUseCase';
import { updateCredentialApiController } from '../useCases/api/credential/UpdateCredentialApiUseCase';
import { deleteCredentialApiController } from '../useCases/api/credential/DeleteCredentialApiUseCase';

import SchemaValidationMiddleware from '../middlewares/SchemaValidationMiddleware';
import UserSessionMiddleware from '../middlewares/HttpAuthorizationMiddleware';

import { createCredentialValidator } from '../validators/CredentialValidator';

const route = Router();

route.use(UserSessionMiddleware);

route.get('/list', listCredentialApiController.handle);
route.get('/:accessKey', getCredentialApiController.handle);
route.post('/', SchemaValidationMiddleware(createCredentialValidator), createCredentialApiController.handle);
route.patch('/:accessKey', SchemaValidationMiddleware(createCredentialValidator), updateCredentialApiController.handle);
route.delete('/:accessKey', deleteCredentialApiController.handle);

export default route;