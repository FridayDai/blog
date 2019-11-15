import express from 'express';
const router = express.Router();
import { createLogger } from '../config/log4j';
import jwt from 'jsonwebtoken';
import { Data } from '../util/axios';
import { findUser } from './dao/loginDao';
const logger = createLogger('Login_Router');

const secretKey = 'blog';

router.post('/login', async (req, res) => {
    const {
        name,
        password
    } = req.body;

    console.log(name, password);
    const user = await findUser(name, password);
    console.log(user);
    if(user) {
        const token = jwt.sign({ name: user.get('name'), readOnly: user.get('readOnly') }, secretKey, {
            expiresIn: '7d',
            issuer: 'fridaydai-blog',
            audience: 'blog'
        });
        const data = { 'name': user.get('name'), token, 'readOnly': user.get('readOnly') };
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
