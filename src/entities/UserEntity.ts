import bcrypt from 'bcrypt';

import { BCRYPT_SALT_ROUNDS } from '../constants';

export class UserEntity {
    username: string;
    email: string;
    password?: string;

    active: boolean;

    createdAt: Date;
    updatedAt: Date;

	constructor(props: Omit<UserEntity, 'getEncryptedPassword' | 'validatePassword' | 'encryptPassword'>) {
        this.username = props.username;
        this.email = props.email;
        this.active = props.active;
        this.password = props.password;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    public getEncryptedPassword(): string {
        return bcrypt.hashSync(this.password!, BCRYPT_SALT_ROUNDS);
    }

    public encryptPassword(password: string): string {
        return bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
    }

    public validatePassword(checkPassword: string): boolean {
        return bcrypt.compareSync(checkPassword, this.password!);
    }
}