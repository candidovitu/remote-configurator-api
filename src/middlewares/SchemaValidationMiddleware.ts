import { Request, Response, NextFunction } from 'express';

const SchemaValidationMiddleware = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            await schema.validate(body);
            next();
        } catch (err: any) {
            const {
                path: field,
                message
            } = err;

            res.status(400).json({
                errors: [ { field, error: message } ]
            });
        }
    }
}

export default SchemaValidationMiddleware;