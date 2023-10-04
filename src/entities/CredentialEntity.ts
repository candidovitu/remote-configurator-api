import bcrypt from 'bcrypt';

import { BCRYPT_SALT_ROUNDS } from '../constants';

export class CredentialEntity {
    name: string;
    accessKey: string;
    secretKey?: string;

    createdAt: Date;
    updatedAt: Date;

	constructor(props: Omit<CredentialEntity, 'getEncryptedSecretKey' | 'encryptSecretKey' | 'validateSecretKey'>) {
        this.name = props.name;
        this.accessKey = props.accessKey;
        this.secretKey = props.secretKey;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    public getEncryptedSecretKey(): string {
        return bcrypt.hashSync(this.secretKey!, BCRYPT_SALT_ROUNDS);
    }

    public encryptSecretKey(password: string): string {
        return bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
    }

    public validateSecretKey(secretKey: string): boolean {
        return bcrypt.compareSync(secretKey, this.secretKey!);
    }
}