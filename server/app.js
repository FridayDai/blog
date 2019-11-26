import express from 'express';
import bodyParser from 'body-parser';
import { TestRouter, LoginRouter, DocRouter } from './router/index';
import helmet from 'helmet';
import { timeHandler, errorHandler, jwtHandler } from './middleware/handler';

const port = 3002;
const prefix = '/api';
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(timeHandler);
// app.use(jwtHandler);
app.use(prefix, LoginRouter);
app.use(prefix, DocRouter);
app.use('/test', TestRouter);

// errorHandler 最后调用
app.use(errorHandler);
app.listen(port, () => console.log(`started, port is ${port}`));
