import express from 'express';
import morgan from 'morgan';
import rpcTasksRouter from './src/routes/rpcTasks.js';
import { RabbitConnection, establishRabbitConn } from './src/utils/amqp.util.js';
import handleErrors from './src/middlewares/handleErrors.js';



const expressPort = process.env.PORT;
const rabbitPort = Number(process.env.RABBIT_PORT);

console.log('Setting up the express app.');
const app = express();
app.use(morgan('common'));
app.use(rpcTasksRouter);
app.use(handleErrors);


(async () => {
    RabbitConnection.connection = await establishRabbitConn(rabbitPort);

    app.listen(expressPort, () => {
        console.log(`Server is running at ${expressPort} port.`);
    });
})();