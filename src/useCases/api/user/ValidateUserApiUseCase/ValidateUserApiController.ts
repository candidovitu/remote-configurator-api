import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { ValidateUserApiUseCase } from './ValidateUserApiUseCase';

export class ValidateUserApiController implements HttpController {
	constructor(private validateUserApiUseCase: ValidateUserApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const useCaseResponse = await this.validateUserApiUseCase.handle(
            email,
            password
        );
        
        if(useCaseResponse.success) {
            res.json(useCaseResponse.data);
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to validate user', errors: useCaseResponse.errors });
        }
    }
}