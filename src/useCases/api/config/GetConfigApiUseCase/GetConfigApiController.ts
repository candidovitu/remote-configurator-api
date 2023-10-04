import { Request, Response } from 'express';

import { ConfigEntity } from '../../../../entities/ConfigEntity';

import { HttpController } from '../../../../interface/ControllerInterface';

import { GetConfigApiUseCase } from './GetConfigApiUseCase';

export class GetConfigApiController implements HttpController {
	constructor(private getConfigApiUseCase: GetConfigApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { namespace, key } = req.params;

        const useCaseResponse = await this.getConfigApiUseCase.handle(namespace, key);
        
        if(useCaseResponse.success) {
            res.json(useCaseResponse.data);
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to get config', errors: useCaseResponse.errors });
        }
    }
}