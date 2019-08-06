import express from 'express';
const router = express.Router();
import { createLogger } from '../config/log4j';
import { Data } from '../util/axios';
import { getDocList, getDocListPage, getDocTitle, getDocById } from './dao/docDao';
const logger = createLogger('Doc_Router');

router.get('/getDocList', async (req, res) => {
    const docList = await getDocList();
    res.send({...Data, data: docList});
});

//  queryString pageNo, pageSize
router.get('/getDocListPage', async (req, res) => {
    const { pageNo, pageSize } = req.query;
    const docList = await getDocListPage(pageNo, pageSize);
    res.send({...Data, data: docList});
});

router.get('/getDocTitle', async (req, res) => {
    const title = await getDocTitle();
    res.send({...Data, data: title});
});

router.get('/getDocById', async(req, res) => {
    const id = req.query.id;
    const doc = await getDocById(id);
    res.send({...Data, data: doc});
});

export default router;
