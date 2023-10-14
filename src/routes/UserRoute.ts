import { Router } from 'express';

import { getUserApiController } from '../useCases/api/user/GetUserApiUseCase';
import { listUserApiController } from '../useCases/api/user/ListUserApiUseCase';
import { createUserApiController } from '../useCases/api/user/CreateUserApiUseCase';
import { updateUserApiController } from '../useCases/api/user/UpdateUserApiUseCase';
import { updateUserPasswordApiController } from '../useCases/api/user/UpdateUserPasswordApiUseCase';
import { deleteUserApiController } from '../useCases/api/user/DeleteUserApiUseCase';
import { validateUserApiController } from '../useCases/api/user/ValidateUserApiUseCase';

import SchemaValidationMiddleware from '../middlewares/SchemaValidationMiddleware';
import UserSessionMiddleware from '../middlewares/HttpAuthorizationMiddleware';

import { createUserValidator, updateUserValidator, updateUserPasswordValidator, authValidateUserValidator } from '../validators/UserValidator';

const route = Router();

route.post('/validate', SchemaValidationMiddleware(authValidateUserValidator), validateUserApiController.handle);

route.use(UserSessionMiddleware);

route.get('/list', listUserApiController.handle);
route.get('/:id', getUserApiController.handle);
route.post('/', SchemaValidationMiddleware(createUserValidator), createUserApiController.handle);
route.patch('/password/:id', SchemaValidationMiddleware(updateUserPasswordValidator), updateUserPasswordApiController.handle);
route.patch('/:id', SchemaValidationMiddleware(updateUserValidator), updateUserApiController.handle);
route.delete('/:id', deleteUserApiController.handle);

export default route;