import { logger } from '../services/LoggerService';

import { UseCaseResponse } from '../interface/UseCaseInterface';
import { DataError } from '../interface/DataErrorInterface';

import { DATABASE_RESPONSE_CODES } from '../constants';

const log = logger.child({ module: 'ErrorHandlerUtil' });

const ErrorHandlerUtil = (error: any): UseCaseResponse => {
    const errors: DataError[] = [];
    let statusCode = 500;

    if(error.name === 'MongoServerError') {
        const errorCode = error.code;

        if(errorCode == DATABASE_RESPONSE_CODES.DUPLICATE_KEY) {
            const fieldsErrors = Object.keys(error.keyValue).map(key => ({
                field: key,
                error: `Duplicate value: ${error.keyValue[key]}`
            }));

            errors.push(...fieldsErrors);
            statusCode = 409;
        }
    } else {
        log.error(error);
    }

    return { success: false, statusCode, errors };
}

export default ErrorHandlerUtil;