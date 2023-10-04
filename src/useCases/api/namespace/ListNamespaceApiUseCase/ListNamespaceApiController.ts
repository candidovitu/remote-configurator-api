import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { ListNamespaceApiUseCase } from './ListNamespaceApiUseCase';

export class ListNamespaceApiController implements HttpController {
	constructor(private listNamespaceApiUseCase: ListNamespaceApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { page, orderBy } = req.query;

        const useCaseResponse = await this.listNamespaceApiUseCase.handle(
            Number(page),
            (orderBy ? String(orderBy) : null)
        );
        
        if(useCaseResponse.success) {
            res.json(useCaseResponse.data);
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to get namespace', errors: useCaseResponse.errors });
        }
    }
}