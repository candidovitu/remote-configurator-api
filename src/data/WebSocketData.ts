import { WebSocketEntity } from "../entities/WebSocketEntity";

import { WsConnections } from "../interface/DataInterface";

let connections: WsConnections = {};

export const appendWsConnection = (channel: string, ws: WebSocketEntity) => {
    if(!connections[channel]) connections[channel] = [];
    connections[channel].push(ws);
}

export const removeWsConnection = (channel: string, ws: WebSocketEntity) => {
    const clientIndex = connections[channel].findIndex(client => client == ws);
    connections[channel].splice(clientIndex, 1);
}

export const broadcastNamespace = (channel: string, data: Object) => {
    const channelConnections = connections[channel] ?? [];
    channelConnections.forEach(client => client.send(JSON.stringify(data)));
}

export const findClientsByAccessKey = (accessKey: string): WebSocketEntity[] => {
    const allConnections = Object.values(connections).flat();

    const foundClients = allConnections.filter(client => client.credential!.accessKey == accessKey);

    return foundClients;
}

export const disconnectAllAccessKeyClients = (accessKey: string) => {
    const clients = findClientsByAccessKey(accessKey);
    clients.forEach(client => client.close());
}