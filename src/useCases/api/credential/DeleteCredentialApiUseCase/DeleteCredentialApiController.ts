import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { DeleteCredentialApiUseCase } from './DeleteCredentialApiUseCase';

export class DeleteCredentialApiController implements HttpController {
	constructor(private deleteCredentialApiUseCase: DeleteCredentialApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { accessKey } = req.params;

        const useCaseResponse = await this.deleteCredentialApiUseCase.handle(accessKey);
        
        if(useCaseResponse.success) {
            res.json({ message: 'Deleted credential' });
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to delete credential', errors: useCaseResponse.errors });
        }
    }
}