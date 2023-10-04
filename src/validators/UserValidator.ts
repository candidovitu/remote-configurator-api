import { string, object, boolean } from 'yup';

export const createUserValidator = object({
    username: string()
        .max(24)
        .matches(/^[a-z|_|\-|1-9]+$/)
        .notOneOf(['admin'])
        .required(),
    email: string()
        .email() 
        .required(),
    password: string()
        .min(6)
        .required(),
    active: boolean()
        .required()
});

export const updateUserValidator = object({
    id: string(),
    username: string()
        .max(24)
        .matches(/^[a-z|_|\-|1-9]+$/)
        .notOneOf(['admin'])
        .required(),
    email: string()
        .email() 
        .required(),
    active: boolean()
        .required()
});

export const updateUserPasswordValidator = object({
    currentPassword: string()
        .required(),
    newPassword: string()
        .min(6)
        .required()
});

export const authValidateUserValidator = object({
    email: string()
        .email() 
        .required(),
    password: string() 
        .required()
});