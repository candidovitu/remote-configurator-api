import { Request, Response } from 'express';

import { ConfigEntity } from '../../../../entities/ConfigEntity';

import { HttpController } from '../../../../interface/ControllerInterface';

import { CreateConfigApiUseCase } from './CreateConfigApiUseCase';

export class CreateConfigApiController implements HttpController {
	constructor(private createConfigApiUseCase: CreateConfigApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const config = new ConfigEntity(req.body);

        const useCaseResponse = await this.createConfigApiUseCase.handle(config);
        
        if(useCaseResponse.success) {
            res.json({ message: 'Created config' });
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to create config', errors: useCaseResponse.errors });
        }

    }
}