import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

import { appendWsConnection } from '../../../../data/WebSocketData';

import { WebSocketEntity } from '../../../../entities/WebSocketEntity';

export class ConnectConfigWsUseCase implements UseCase {
    constructor() {}

    handle = async (namespace: string, ws: WebSocketEntity): Promise<UseCaseResponse> => {
        try {
            appendWsConnection(namespace, ws);
            
            return { success: true };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}