import jwt from 'jsonwebtoken';
import { createLogger } from '../config/log4j';
import { Data } from '../util/axios';
const secretKey = 'blog';

const logger = createLogger('Middleware_Handler');

export const timeHandler = (req, res, next) => {
    const start = new Date();
    next();
    const end = new Date().getTime();
    logger.info(`${start} ${req.method} ${req.originalUrl} ${req.ip}`, `Time Consume: ${end - start.getTime()}ms`);
};

export const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError' || err.name === 'NotBeforeError') {
        res.status(401).send({...Data, status: 401, msg: err.message});
    }

    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send({...Data, status: 401, msg: err.message}); // All HTTP requests must have a response, so let's send back an error with its status code and message
};

export const jwtHandler = (req, res, next) => {
    if(req.originalUrl === '/api/login') {
        next();
    } else {
        const token = req.headers.authorization;
        logger.info(token);
        jwt.verify(token, secretKey, {
            issuer: 'fridaydai-blog',
            audience: 'blog'
        });
        next();
    }
};