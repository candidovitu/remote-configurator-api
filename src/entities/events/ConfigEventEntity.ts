import { broadcastNamespace } from '../../data/WebSocketData';

import { CONFIG_EVENT_TYPES } from '../../interface/EventInterface';

import { ConfigEntity } from '../ConfigEntity';

 export class ConfigEventEntity {
    config: ConfigEntity;
    eventType: CONFIG_EVENT_TYPES;
    
    constructor(props: Omit<ConfigEventEntity, 'broadcast'>) {
        this.config = props.config;
        this.eventType = props.eventType;
    }

    broadcast(): void {
        const webSocketChannel = `config_${this.config.namespace}_${this.config.key}`;

        broadcastNamespace(webSocketChannel, {
            type: this.eventType,
            config: this.config
        });
    }

 }