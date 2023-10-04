import { string, object } from 'yup';

export const createConfigValidator = object({
    namespace: string().required(),
    key: string().required(),
    data: object().required(),
});