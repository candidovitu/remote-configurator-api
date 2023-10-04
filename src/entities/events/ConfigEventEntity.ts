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
        broadcastNamespace(this.config.namespace, {
            type: this.eventType,
            data: this.config
        });
    }

 }