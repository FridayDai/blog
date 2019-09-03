import express from 'express';
const router = express.Router();
import { createLogger } from '../config/log4j';
import { invariant } from '../util/index';
import { Data } from '../util/axios';
import { getDocList, getDocListPage, getDocTitle, getDocById, getDocListByKeyword } from './dao/docDao';
const logger = createLogger('Doc_Router');

router.get('/getDocList', async (req, res) => {
    const docList = await getDocList();
    res.send({...Data, data: docList});
});

//  queryString pageNo, pageSize
router.get('/getDocListPage', async (req, res, next) => {
    const { pageNo, pageSize } = req.query;
    if(invariant(pageNo, pageSize)) {
        next(new Error('variable is null'));
    } else {
        const docList = await getDocListPage(pageNo, pageSize);
        res.send({...Data, data: docList});
    }
});

router.post('/getDocListByKeyword', async(req, res, next) => {
    const { keyword } = req.body;
    let docList = [];
    if(invariant(keyword)) {
        //next(new Error('variable is null'));
        docList = await getDocTitle();
    } else {
        docList = await getDocListByKeyword(keyword);
    }
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
