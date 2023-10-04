import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { DeleteUserApiUseCase } from './DeleteUserApiUseCase';

export class DeleteUserApiController implements HttpController {
	constructor(private deleteUserApiUseCase: DeleteUserApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { id } = req.params;

        const useCaseResponse = await this.deleteUserApiUseCase.handle(id);
        
        if(useCaseResponse.success) {
            res.json({ message: 'Deleted user' });
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to delete user', errors: useCaseResponse.errors });
        }
    }
}