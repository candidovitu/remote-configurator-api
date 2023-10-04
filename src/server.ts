import express from 'express';
import morgan from 'morgan';

import { logger, httpLogStream } from './services/LoggerService';
import { createWsInstance } from './services/WebSocketService';

const app = express();
const log = logger.child({ module: 'Server' });

const { APP_PORT } = process.env;

createWsInstance(app);
app.use(express.json());
app.use(morgan(':method :url :status :response-time ms', { stream: httpLogStream }));

import HealthRoute from './routes/HealthRoute';
import NamespaceRoute from './routes/NamespaceRoute';
import ConfigRoute from './routes/ConfigRoute';
import UserRoute from './routes/UserRoute';
import CredentialRoute from './routes/CredentialRoute';
import SocketRoute from './routes/SocketRoute';

app.use('/health', HealthRoute);
app.use('/namespace', NamespaceRoute);
app.use('/config', ConfigRoute);
app.use('/user', UserRoute);
app.use('/credential', CredentialRoute);
app.use('/ws', SocketRoute);

app.listen(APP_PORT, () => {
    log.info(`Server running at ${APP_PORT}!`);
});