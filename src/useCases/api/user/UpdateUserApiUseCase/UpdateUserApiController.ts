import { Request, Response } from 'express';

import { UserEntity } from '../../../../entities/UserEntity';

import { HttpController } from '../../../../interface/ControllerInterface';

import { UpdateUserApiUseCase } from './UpdateUserApiUseCase';

export class UpdateUserApiController implements HttpController {
	constructor(private updateUserApiUseCase: UpdateUserApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { id } = req.params;

        const user = new UserEntity(req.body);

        const useCaseResponse = await this.updateUserApiUseCase.handle(id, user);
        
        if(useCaseResponse.success) {
            res.json({ message: 'Updated user' });
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to update user', errors: useCaseResponse.errors });
        }
    }
}