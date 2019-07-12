import log4js from 'log4js';
import path from 'path';

log4js.configure({
    appenders: {
        everything: { type: 'file', filename: 'blog.log', maxLogSize: 10240000, backups: 3, compress: true },
        console: { type: 'stdout' }
    },
    categories: {
        default: { appenders: [ 'everything', 'console' ], level: 'debug' }
    }
});

export const createLogger = (category = 'default', level = 'debug') => {
    const logger = log4js.getLogger(category);
    logger.level = level;

    return logger;
};

