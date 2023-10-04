import { Request } from 'express';

import { logger } from '../../../../services/LoggerService';

import { WsController } from '../../../../interface/ControllerInterface';

import { WebSocketEntity } from '../../../../entities/WebSocketEntity';

import { ConnectConfigWsUseCase } from './ConnectConfigWsUseCase';

const log = logger.child({
    module: 'ConnectConfigWsController'
});

export class ConnectConfigWsController implements WsController {
	constructor(private connectWsApiUseCase: ConnectConfigWsUseCase) {}

    public handle = async (ws: WebSocketEntity, req: Request) => {
        const { namespace, key } = req.params;
        const { credential } = req;

        const useCaseResponse = await this.connectWsApiUseCase.handle(namespace, key, ws);
        
        if(useCaseResponse.success) {
            log.info(`Connected client (accessKey: ${credential.accessKey})`);
            ws.send(JSON.stringify({ message: 'Successfully connected' }));
        } else {
            ws.close(1011, JSON.stringify({ message: 'failed to connect on config ws', errors: useCaseResponse.errors }));
        }
    }
}