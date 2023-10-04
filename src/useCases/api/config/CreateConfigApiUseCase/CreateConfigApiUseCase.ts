import { Repository } from 'typeorm';

import { ConfigModel } from '../../../../models/ConfigModel';

import { ConfigEntity } from '../../../../entities/ConfigEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class CreateConfigApiUseCase implements UseCase {
    constructor(
        private configRepository: Repository<ConfigModel>
    ) {}

    handle = async (config: ConfigEntity): Promise<UseCaseResponse> => {
        try {
            config.createdAt = new Date();
            config.updatedAt = new Date();

            await this.configRepository.insert(config);
            
            return { success: true };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}