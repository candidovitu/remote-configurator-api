import { Repository } from 'typeorm';

import { ConfigModel } from '../../../../models/ConfigModel';

import { ConfigEntity } from '../../../../entities/ConfigEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';

export class GetConfigApiUseCase implements UseCase {
    constructor(
        private configRepository: Repository<ConfigModel>
    ) {}

    handle = async (namespace: string, key: string): Promise<UseCaseResponse> => {
        try {
            const foundConfig = await this.configRepository.findOneBy({ key, namespace });

            if(!foundConfig) return { success: false, statusCode: 404, errors: [ { field: 'key', error: 'Config not found' }] }

            const config = new ConfigEntity(foundConfig);

            return { success: true, data: config };
        } catch (err) {
            console.log(err);
            return { success: false };
        }
    }
}