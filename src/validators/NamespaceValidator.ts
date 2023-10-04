import { string, object, array } from 'yup';

export const createNamespaceValidator = object({
    name: string()
          .max(32)
          .matches(/^[a-z|_|\-|1-9]+$/)
          .required(),
    allowedCredentials: array(string())
});