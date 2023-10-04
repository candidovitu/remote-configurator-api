import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { GetUserApiUseCase } from './GetUserApiUseCase';

export class GetUserApiController implements HttpController {
	constructor(private getUserApiUseCase: GetUserApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { id } = req.params;

        const useCaseResponse = await this.getUserApiUseCase.handle(id);
        
        if(useCaseResponse.success) {
            res.json(useCaseResponse.data);
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to get user', errors: useCaseResponse.errors });
        }
    }
}