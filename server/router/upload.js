import express from 'express';
import fs from 'fs';
import { createLogger } from '../config/log4j';

var multer  = require('multer')
var upload = multer({ dest: '/img/' })
const router = express.Router();
const logger = createLogger('Upload_Router');

router.post('/uploadImg', upload.single('file'), async (req, res) => {
    console.log(req.file);
    // 重命名文件
    fs.rename(req.file.path, "/img/" + req.file.originalname, function(err) {
        if (err) {
            throw err;
        }

        res.send({ 'code': 200, "data": { 'address': `106.15.93.13:3001/img/${req.file.originalname}` } });
    });
});

export default router;
