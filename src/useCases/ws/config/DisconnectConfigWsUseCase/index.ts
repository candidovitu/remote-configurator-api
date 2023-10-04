import { DisconnectConfigWsController } from "./DisconnectConfigWsController";
import { DisconnectConfigWsUseCase } from "./DisconnectConfigWsUseCase";

const disconnectConfigWsUseCase = new DisconnectConfigWsUseCase();
export const disconnectConfigWsController = new DisconnectConfigWsController(disconnectConfigWsUseCase);