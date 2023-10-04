import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { GetNamespaceApiUseCase } from './GetNamespaceApiUseCase';

export class GetNamespaceApiController implements HttpController {
	constructor(private getNamespaceApiUseCase: GetNamespaceApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { name } = req.params;

        const useCaseResponse = await this.getNamespaceApiUseCase.handle(name);
        
        if(useCaseResponse.success) {
            res.json(useCaseResponse.data);
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to get namespace', errors: useCaseResponse.errors });
        }
    }
}