import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { CreateCredentialApiUseCase } from './CreateCredentialApiUseCase';

export class CreateCredentialApiController implements HttpController {
	constructor(private createCredentialApiUseCase: CreateCredentialApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { name } = req.body;

        const useCaseResponse = await this.createCredentialApiUseCase.handle(name);
        
        if(useCaseResponse.success) {
            res.json(useCaseResponse.data);
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to create credential', errors: useCaseResponse.errors });
        }
    }
}