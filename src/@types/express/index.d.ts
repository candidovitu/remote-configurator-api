import { CredentialEntity } from "src/entities/CredentialEntity";
import { UserEntity } from "src/entities/UserEntity";

declare module 'express-serve-static-core' {
   interface Request {
     user?: UserEntity
     credential?: CredentialEntity;
   }
 }