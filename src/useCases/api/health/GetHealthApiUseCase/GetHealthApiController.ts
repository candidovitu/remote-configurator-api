import { Request, Response } from 'express';

import { HttpController } from '../../../../interface/ControllerInterface';

import { HealthApiUseCase } from './GetHealthApiUseCase';

export class HealthApiController implements HttpController {
	constructor(private healthApiUseCase: HealthApiUseCase) {}

    public handle = (req: Request, res: Response) => {
        const useCaseResponse = this.healthApiUseCase.handle();
        
        if(useCaseResponse.success) {
            res.json({ message: 'Success health' });
        } else {
            res.status(500).json({ message: 'Health failed', errors: useCaseResponse.errors });
        }

    }
}