import { WebSocketEntity } from "../entities/WebSocketEntity";

import { WsConnections } from "../interface/DataInterface";

let connections: WsConnections = {};

export const appendWsConnection = (namespace: string, ws: WebSocketEntity) => {
    if(!connections[namespace]) connections[namespace] = [];
    connections[namespace].push(ws);
}

export const removeWsConnection = (namespace: string, ws: WebSocketEntity) => {
    const clientIndex = connections[namespace].findIndex(client => client == ws);
    connections[namespace].splice(clientIndex, 1);
}

export const broadcastNamespace = (namespace: string, data: Object) => {
    const namespaceConnections = connections[namespace] ?? [];
    namespaceConnections.forEach(client => client.send(JSON.stringify(data)));
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