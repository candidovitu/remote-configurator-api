import { Router } from 'express';

import { getConfigApiController } from '../useCases/api/config/GetConfigApiUseCase';
import { listConfigApiController } from '../useCases/api/config/ListConfigApiUseCase';
import { createConfigApiController } from '../useCases/api/config/CreateConfigApiUseCase';
import { updateConfigApiController } from '../useCases/api/config/UpdateConfigApiUseCase';
import { deleteConfigApiController } from '../useCases/api/config/DeleteConfigApiUseCase';

import { connectConfigWsController } from '../useCases/ws/config/ConnectConfigWsUseCase';
import { disconnectConfigWsController } from '../useCases/ws/config/DisconnectConfigWsUseCase';

import SchemaValidationMiddleware from '../middlewares/SchemaValidationMiddleware';
import UserSessionMiddleware from '../middlewares/UserSessionMiddleware';
import CredentialMiddleware from '../middlewares/CredentialMiddleware';

import { createConfigValidator } from '../validators/ConfigValidator';

import { WebSocketEntity } from '../entities/WebSocketEntity';

const route = Router();

route.ws('/:namespace', CredentialMiddleware, (ws, req) => {
    const webSocketEntity = (ws as WebSocketEntity);

    connectConfigWsController.handle(webSocketEntity, req);
    ws.on('close', () => disconnectConfigWsController.handle(webSocketEntity, req));
});

route.use(UserSessionMiddleware);

route.get('/list/:namespace', listConfigApiController.handle);
route.get('/:namespace/:key', getConfigApiController.handle);
route.post('/', SchemaValidationMiddleware(createConfigValidator), createConfigApiController.handle);
route.patch('/', SchemaValidationMiddleware(createConfigValidator), updateConfigApiController.handle);
route.delete('/:namespace/:key', deleteConfigApiController.handle);

export default route;