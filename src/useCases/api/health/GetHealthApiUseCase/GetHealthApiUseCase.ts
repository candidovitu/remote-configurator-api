import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

export class HealthApiUseCase implements UseCase {
    constructor() {}

    handle = (): UseCaseResponse => {
        return { success: true };
    }
}