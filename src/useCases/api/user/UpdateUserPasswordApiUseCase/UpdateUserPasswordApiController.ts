import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { UpdateUserPasswordApiUseCase } from './UpdateUserPasswordApiUseCase';

export class UpdateUserPasswordApiController implements HttpController {
	constructor(private updateUserPasswordApiUseCase: UpdateUserPasswordApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        const useCaseResponse = await this.updateUserPasswordApiUseCase.handle(
            id,
            currentPassword,
            newPassword
        );
        
        if(useCaseResponse.success) {
            res.json({ message: 'Updated user password' });
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to update user password', errors: useCaseResponse.errors });
        }
    }
}