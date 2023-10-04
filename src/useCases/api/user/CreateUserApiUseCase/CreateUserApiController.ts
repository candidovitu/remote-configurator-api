import { Request, Response } from 'express';

import { UserEntity } from '../../../../entities/UserEntity';

import { HttpController } from '../../../../interface/ControllerInterface';

import { CreateUserApiUseCase } from './CreateUserApiUseCase';

export class CreateUserApiController implements HttpController {
	constructor(private createUserApiUseCase: CreateUserApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const user = new UserEntity(req.body);

        const useCaseResponse = await this.createUserApiUseCase.handle(user);
        
        if(useCaseResponse.success) {
            res.json({ message: 'Created user' });
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to create user', errors: useCaseResponse.errors });
        }
    }
}