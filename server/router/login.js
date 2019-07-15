import express from 'express';
import { createLogger } from '../config/log4j';
import jwt from 'jsonwebtoken';
import { Data } from '../util/axios';
import { findUser } from './dao/loginDao';
const logger = createLogger('Index_Router');
const router = express.Router();

const secretKey = 'blog';

router.post('/login', async (req, res) => {
    const {
        name,
        password
    } = req.body;

    const user = await findUser(name, password);
    if(user && user.length > 0) {
        const token = jwt.sign({ name: user.name, readOnly: user.readOnly }, secretKey, {
            expiresIn: '7d',
            issuer: 'fridaydai-blog',
            audience: 'blog'
        });

        const data = { name: user.name, token: token, readOnly: user.readOnly };

        res.send({...Data, data: data, status: 200 });
    } else {
        logger.error("login error: ", name, password);
        res.send({...Data, data: null, status: -1, msg: '用户名密码错误' });
    }
});

router.get('/testlogin', async (req, res, next) => {
    res.send('data');
});

export default router;
