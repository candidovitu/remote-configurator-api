import winston from 'winston';

export const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    exitOnError: false,
    transports: [
        new winston.transports.Console()
    ]
});

const httpLog = logger.child({
    module: 'Http'
});

export const httpLogStream = {
    write: (text: string) => {
        const statusCode = parseInt(text.split(' ')[2]);
        const content = text.replaceAll('\n', '');

        httpLog[statusCode >= 400 ? 'error' : 'info'](content);
    }
}