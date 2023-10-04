import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { ListCredentialApiUseCase } from './ListCredentialApiUseCase';

export class ListCredentialApiController implements HttpController {
	constructor(private listCredentialApiUseCase: ListCredentialApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { page, orderBy } = req.query;

        const useCaseResponse = await this.listCredentialApiUseCase.handle(
            Number(page),
            (orderBy ? String(orderBy) : null)
        );
        
        if(useCaseResponse.success) {
            res.json(useCaseResponse.data);
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to list credentials', errors: useCaseResponse.errors });
        }
    }
}