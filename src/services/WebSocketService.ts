import ws from 'express-ws';
import { Application } from 'express';

let instance: ws.Instance;

export const createWsInstance = (expressApp: Application) => {
    instance = ws(expressApp);
}

export const getWsInstance = (): ws.Instance => instance;