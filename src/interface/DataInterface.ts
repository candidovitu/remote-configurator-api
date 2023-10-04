import { WebSocketEntity } from "../entities/WebSocketEntity";

export interface WsConnections {
    [namespace: string]: WebSocketEntity[];
}