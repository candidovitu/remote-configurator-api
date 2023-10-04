import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { ListUserApiUseCase } from './ListUserApiUseCase';

export class ListUserApiController implements HttpController {
	constructor(private listUserApiUseCase: ListUserApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { page, orderBy } = req.query;

        const useCaseResponse = await this.listUserApiUseCase.handle(
            Number(page),
            (orderBy ? String(orderBy) : null)
        );
        
        if(useCaseResponse.success) {
            res.json(useCaseResponse.data);
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to list users', errors: useCaseResponse.errors });
        }
    }
}