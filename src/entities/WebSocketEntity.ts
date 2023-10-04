import WebSocket from 'ws';

import { CredentialEntity } from './CredentialEntity';

export class WebSocketEntity extends WebSocket {
    credential?: CredentialEntity;
}