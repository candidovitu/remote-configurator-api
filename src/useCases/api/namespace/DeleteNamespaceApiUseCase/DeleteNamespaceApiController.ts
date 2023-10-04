import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { DeleteNamespaceApiUseCase } from './DeleteNamespaceApiUseCase';

export class DeleteNamespaceApiController implements HttpController {
	constructor(private deleteNamespaceApiUseCase: DeleteNamespaceApiUseCase) {}

    public handle = async (req: Request, res: Response) => {
        const { name } = req.params;

        const useCaseResponse = await this.deleteNamespaceApiUseCase.handle(name);
        
        if(useCaseResponse.success) {
            res.json({ message: 'namespace deleted' });
        } else {
            res.status(useCaseResponse.statusCode ?? 500).json({ message: 'failed to delete namespace', errors: useCaseResponse.errors });
        }
    }
}