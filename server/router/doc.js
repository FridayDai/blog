import express from 'express';
const router = express.Router();
import { createLogger } from '../config/log4j';
import { invariant } from '../util/index';
import { Data } from '../util/axios';
import { getDocList, getDocListPage, getDocTitle, getDocById, getDocListByKeyword, updateDocById, deleteDocById } from './dao/docDao';
const logger = createLogger('Doc_Router');

router.post('/updateDocById', async (req, res, next) => {
    try {
        const { id, title, desc, text } = req.body;
        invariant(id, title, desc, text);

        const rlt = await updateDocById(id, title, desc, text);
        if(rlt[0] > 0) {
            res.send({...Data, data: rlt});
        }
    } catch (e) {
        next(e);
    }
});

router.post('/deleteDocById', async (req, res, next) => {
    try {
        const { id } = req.body;
        invariant(id);

        const rlt = await deleteDocById(id);
        if(rlt[0] > 0) {
            res.send({...Data, data: rlt});
        }
    } catch (e) {
        next(e);
    }
});

router.get('/getDocList', async (req, res) => {
    const docList = await getDocList();
    res.send({...Data, data: docList});
});

//  queryString pageNo, pageSize
router.get('/getDocListPage', async (req, res, next) => {
    try {
        const { pageNo, pageSize } = req.query;
        invariant(pageNo, pageSize);

        const docList = await getDocListPage(pageNo, pageSize);
        res.send({...Data, data: docList});
    } catch (e){
        next(e);
    }
});

router.post('/getDocListByKeyword', async(req, res, next) => {
    try {
        const { keyword } = req.body;
        let docList = [];
        if(!keyword) {
            docList = await getDocTitle();
        } else {
            docList = await getDocListByKeyword(keyword);
        }
        res.send({...Data, data: docList});
    } catch (e) {
        next(e);
    }
});

router.get('/getDocTitle', async (req, res) => {
    const title = await getDocTitle();
    res.send({...Data, data: title});
});

router.get('/getDocById', async(req, res) => {
    try {
        const id = req.query.id;
        invariant(id);

        const doc = await getDocById(id);
        res.send({...Data, data: doc});
    } catch (e) {
        next(e);
    }
});

export default router;
