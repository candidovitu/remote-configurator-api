import { Request, Response } from 'express';

import { ConfigEntity } from '../../../../entities/ConfigEntity';

import { HttpController } from '../../../../interface/ControllerInterface';

import { UpdateConfigApiUseCase } from './UpdateConfigApiUseCase';

export class UpdateConfigApiController implements HttpController {
	constructor(private updateConfigApiUseCase: UpdateConfigApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const config = new ConfigEntity(req.body);

        const useCaseResponse = await this.updateConfigApiUseCase.handle(config);
        
        if(useCaseResponse.success) {
            res.json({ message: 'Updated config' });
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to update config', errors: useCaseResponse.errors });
        }

    }
}