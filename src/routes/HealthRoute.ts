import { Router } from 'express';

import { healthApiController } from '../useCases/api/health/GetHealthApiUseCase';

const route = Router();

route.get('/', healthApiController.handle);

export default route;