import { WebSocketEntity } from "../entities/WebSocketEntity";

export interface WsConnections {
    [channel: string]: WebSocketEntity[];
}