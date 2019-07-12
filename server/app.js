import express from 'express';
import bodyParser from 'body-parser';
import router from './router/index';
import helmet from 'helmet';
import { timeHandler, errorHandler } from './middleware/handler';

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(timeHandler);
app.use(router);

// errorHandler 最后调用
app.use(errorHandler);
app.listen(3002, () => console.log('started, port is 3002'));
