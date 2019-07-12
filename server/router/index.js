import express from 'express';
import { createLogger } from '../config/log4j';
import { dropTable, createTable, insertUser, findAll, updateUserById, deleteUserById, restore, batchInsertUser, findUserAndCountAll, testAxios } from './dao/testDao';
const logger = createLogger('Index_Router');
const router = express.Router();

router.get('/get', async (req, res) => {
    const users = await findAll();
    res.send(users);
});

router.get('/findUserAndCountAll', async(req, res) => {
    const rlt = await findUserAndCountAll();
    res.send(rlt);
});

router.post('/post', async (req, res) => {
    const {
        id,
        name
    } = req.body;
    const rlt = await insertUser(id, name);
    logger.info(rlt);
    res.send(rlt);
});

router.post('/batch', async (req, res) => {
    // [ { name: '3' }, { name: '4' }, { name: '5' } ]
    const {
        obj
    } = req.body;
    const rlt = await batchInsertUser(obj);
    logger.info(rlt);
    res.send('OK');
});

router.post('/update', async (req, res) => {
    const rlt = await updateUserById(1, 'hahahah');
    res.send(rlt);
});

router.post('/delete', async (req, res) => {
    const rlt = await deleteUserById(req.body.id);
    logger.info(rlt);
    res.send('OK');
});

router.get('/restore', async (req, res) => {
    const rlt = await restore(req.query.id);
    logger.info(rlt);
    res.send('OK');
});

router.get('/axios', async (req, res) => {
    const rlt = await testAxios('https://106.15.93.13/rest/getDocList');
    res.send(rlt);
});

export default router;
