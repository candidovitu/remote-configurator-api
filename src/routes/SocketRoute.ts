import { Router } from 'express';

import { getWsInstance } from '../services/WebSocketService';

const route = Router();

route.ws('/:credentialAccessKey', (ws, req) => {
    console.log('new ws connection');
    req.credential = {
        name: 'bla',
        accessKey: 'teste'
    }

    ws.on('message', data => {
        const wsInstance = getWsInstance();

        console.log('ws message:', data);

        console.log('ws clients', wsInstance.getWss().clients)
    });
});

export default route;