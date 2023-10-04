import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { ListConfigApiUseCase } from './ListConfigApiUseCase';

export class ListConfigApiController implements HttpController {
	constructor(private listConfigApiUseCase: ListConfigApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { page, orderBy } = req.query;
        const { namespace } = req.params;

        const useCaseResponse = await this.listConfigApiUseCase.handle(
            namespace,
            Number(page),
            (orderBy ? String(orderBy) : null)    
        );
        
        if(useCaseResponse.success) {
            res.json(useCaseResponse.data);
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to list config', errors: useCaseResponse.errors });
        }
    }
}