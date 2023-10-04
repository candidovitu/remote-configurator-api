import { HealthApiController } from "./GetHealthApiController";
import { HealthApiUseCase } from "./GetHealthApiUseCase";

const healthApiUseCase = new HealthApiUseCase();
export const healthApiController = new HealthApiController(healthApiUseCase);