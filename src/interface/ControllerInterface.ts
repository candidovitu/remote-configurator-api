import { Request, Response } from 'express';

import { WebSocketEntity } from '../entities/WebSocketEntity';

export interface HttpController {
    handle(req: Request, res: Response): void;
}

export interface WsController {
    handle(ws: WebSocketEntity, req: Request, ...data: any): void;
}