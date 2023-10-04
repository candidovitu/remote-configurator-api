import { Repository } from 'typeorm';

import { ConfigModel } from '../../../../models/ConfigModel';

import { ConfigEntity } from '../../../../entities/ConfigEntity';
import { ConfigEventEntity } from '../../../../entities/events/ConfigEventEntity';

import { UseCase, UseCaseResponse } from '../../../../interface/UseCaseInterface';
import { CONFIG_EVENT_TYPES } from '../../../../interface/EventInterface';

import ErrorHandlerUtil from '../../../../utils/ErrorHandlerUtil';

export class UpdateConfigApiUseCase implements UseCase {
    constructor(
        private configRepository: Repository<ConfigModel>
    ) {}

    handle = async (config: ConfigEntity): Promise<UseCaseResponse> => {
        try {
            config.updatedAt = new Date();
            
            const updateResult = await this.configRepository.update({ key: config.key }, config);

            if(!updateResult.raw.matchedCount) return { success: false, statusCode: 404, errors: [ { field: 'key', error: `Key '${config.key}' not found` } ] };

            new ConfigEventEntity({
                config,
                eventType: CONFIG_EVENT_TYPES.UPDATE
            })
            .broadcast();

            return { success: true };
        } catch (err: any) {
            return ErrorHandlerUtil(err);
        }
    }
}