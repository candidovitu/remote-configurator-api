import { Router } from 'express';

import { getNamespaceApiController } from '../useCases/api/namespace/GetNamespaceApiUseCase';
import { listNamespaceApiController } from '../useCases/api/namespace/ListNamespaceApiUseCase';
import { createNamespaceApiController } from '../useCases/api/namespace/CreateNamespaceApiUseCase';
import { updateNamespaceApiController } from '../useCases/api/namespace/UpdateNamespaceApiUseCase';
import { deleteNamespaceApiController } from '../useCases/api/namespace/DeleteNamespaceApiUseCase';

import SchemaValidationMiddleware from '../middlewares/SchemaValidationMiddleware';
import UserSessionMiddleware from '../middlewares/UserSessionMiddleware';

import { createNamespaceValidator } from '../validators/NamespaceValidator';

const route = Router();

route.use(UserSessionMiddleware);

route.get('/list', listNamespaceApiController.handle);
route.get('/:name', getNamespaceApiController.handle);
route.post('/', SchemaValidationMiddleware(createNamespaceValidator), createNamespaceApiController.handle);
route.patch('/', SchemaValidationMiddleware(createNamespaceValidator), updateNamespaceApiController.handle);
route.delete('/:name', deleteNamespaceApiController.handle);

export default route;