import { ConnectConfigWsController } from "./ConnectConfigWsController";
import { ConnectConfigWsUseCase } from "./ConnectConfigWsUseCase";

const connectConfigWsUseCase = new ConnectConfigWsUseCase();
export const connectConfigWsController = new ConnectConfigWsController(connectConfigWsUseCase);