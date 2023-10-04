import { Request } from 'express';
import WebSocket from 'ws';

import { logger } from '../../../../services/LoggerService';

import { WsController } from '../../../../interface/ControllerInterface';

import { DisconnectConfigWsUseCase } from './DisconnectConfigWsUseCase';

const log = logger.child({
    module: 'DisconnectConfigWsController'
});

export class DisconnectConfigWsController implements WsController {
	constructor(private disconnectWsApiUseCase: DisconnectConfigWsUseCase) {}

    public handle = async (ws: WebSocket, req: Request) => {
        const { namespace } = req.params;
        const { credential } = req;
        
        const useCaseResponse = await this.disconnectWsApiUseCase.handle(namespace, ws);
        
        if(useCaseResponse.success) {
            log.info(`Disconnect client (accessKey: ${credential.accessKey})`);
        }
    }
}