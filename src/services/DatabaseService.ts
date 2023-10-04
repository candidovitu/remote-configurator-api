import { DataSource } from 'typeorm';

import { ConfigModel } from '../models/ConfigModel';
import { NamespaceModel } from '../models/NamespaceModel';
import { UserModel } from '../models/UserModel';
import { SessionModel } from '../models/SessionModel';
import { CredentialModel } from '../models/CredentialModel';

const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_COLLECTION,
    DATABASE_AUTH_SOURCE
} = process.env;

export const dataSource = new DataSource({
    type: 'mongodb',
    host: DATABASE_HOST,
    port: parseInt(DATABASE_PORT || ''),
    database: DATABASE_COLLECTION,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    authSource: DATABASE_AUTH_SOURCE,
    entities: [
        ConfigModel,
        NamespaceModel,
        UserModel,
        SessionModel,
        CredentialModel
    ],
    synchronize: true
});