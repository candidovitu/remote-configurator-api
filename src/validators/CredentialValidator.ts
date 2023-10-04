import { string, object } from 'yup';

export const createCredentialValidator = object({
    name: string()
});