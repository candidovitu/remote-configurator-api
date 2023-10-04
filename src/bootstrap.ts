import { dataSource } from "./services/DatabaseService";
import { logger } from "./services/LoggerService";

/**
 * Flamengo campeão
 */

const log = logger.child({ module: 'Bootstrap' });

const appBootstrap = async () => {
    try {
        await dataSource.initialize()
        .then(() => log.info('Datasource initialized'));
        
        log.info('Successfully app bootstrapped');
    } catch (err) {
        log.error('Failed to bootstrap app', err)
    }
}

appBootstrap();