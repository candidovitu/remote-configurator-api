import { Request, Response } from 'express';

import { NamespaceEntity } from '../../../../entities/NamespaceEntity';

import { HttpController } from '../../../../interface/ControllerInterface';

import { CreateNamespaceApiUseCase } from './CreateNamespaceApiUseCase';

export class CreateNamespaceApiController implements HttpController {
	constructor(private createNamespaceApiUseCase: CreateNamespaceApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const namespace = new NamespaceEntity(req.body);

        const useCaseResponse = await this.createNamespaceApiUseCase.handle(namespace);
        
        if(useCaseResponse.success) {
            res.json({ message: 'Created namespace' });
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to create namespace', errors: useCaseResponse.errors });
        }

    }
}