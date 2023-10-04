import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { GetCredentialApiUseCase } from './GetCredentialApiUseCase';

export class GetCredentialApiController implements HttpController {
	constructor(private getCredentialApiUseCase: GetCredentialApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { accessKey } = req.params;

        const useCaseResponse = await this.getCredentialApiUseCase.handle(accessKey);
        
        if(useCaseResponse.success) {
            res.json(useCaseResponse.data);
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to get credential', errors: useCaseResponse.errors });
        }
    }
}