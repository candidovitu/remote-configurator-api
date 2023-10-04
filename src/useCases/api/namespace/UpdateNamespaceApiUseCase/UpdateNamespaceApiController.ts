import { Request, Response } from 'express';

import { NamespaceEntity } from '../../../../entities/NamespaceEntity';

import { HttpController } from '../../../../interface/ControllerInterface';

import { UpdateNamespaceApiUseCase } from './UpdateNamespaceApiUseCase';

export class UpdateNamespaceApiController implements HttpController {
	constructor(private updateNamespaceApiUseCase: UpdateNamespaceApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const namespace = new NamespaceEntity(req.body);

        const useCaseResponse = await this.updateNamespaceApiUseCase.handle(namespace);
        
        if(useCaseResponse.success) {
            res.json({ message: 'Updated namespace' });
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to update namespace', errors: useCaseResponse.errors });
        }

    }
}