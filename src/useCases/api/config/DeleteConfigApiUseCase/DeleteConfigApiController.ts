import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { DeleteConfigApiUseCase } from './DeleteConfigApiUseCase';

export class DeleteConfigApiController implements HttpController {
	constructor(private deleteConfigApiUseCase: DeleteConfigApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { namespace, key } = req.params;

        const useCaseResponse = await this.deleteConfigApiUseCase.handle(namespace, key);
        
        if(useCaseResponse.success) {
            res.json({ message: 'Config deleted' });
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to delete config', errors: useCaseResponse.errors });
        }
    }
}