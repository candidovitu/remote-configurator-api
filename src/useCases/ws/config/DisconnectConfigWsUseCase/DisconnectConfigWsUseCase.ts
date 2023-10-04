import WebSocket from 'ws';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

import { removeWsConnection } from '../../../../data/WebSocketData';

export class DisconnectConfigWsUseCase implements UseCase {
    constructor() {}

    handle = async (namespace: string, ws: WebSocket): Promise<UseCaseResponse> => {
        try {
            removeWsConnection(namespace, ws);
            
            return { success: true };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}