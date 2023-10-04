import { Request, Response } from 'express';

import { CredentialEntity } from '../../../../entities/CredentialEntity';

import { HttpController } from '../../../../interface/ControllerInterface';

import { UpdateCredentialApiUseCase } from './UpdateCredentialApiUseCase';

export class UpdateCredentialApiController implements HttpController {
	constructor(private updateCredentialApiUseCase: UpdateCredentialApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { accessKey } = req.params;

        const credential = new CredentialEntity({
            accessKey,
            ...req.body
        });

        const useCaseResponse = await this.updateCredentialApiUseCase.handle(credential);
        
        if(useCaseResponse.success) {
            res.json({ message: 'Updated credential' });
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to update credential', errors: useCaseResponse.errors });
        }
    }
}