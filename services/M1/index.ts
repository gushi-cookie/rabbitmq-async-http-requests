import express from 'express';
import rpcTasksRouter from './src/routes/rpcTasks.js';
import { RabbitConnection, establishRabbitConn } from './src/utils/amqp.util.js';
import handleErrors from './src/middlewares/handleErrors.js';


const originalLogFn = console.log;
console.log = function(message: any) {
    originalLogFn(`[M1: Backend] ${message}`);
};


const expressPort = process.env.PORT;
const rabbitPort = Number(process.env.RABBIT_PORT);

const app = express();
app.use(rpcTasksRouter);
app.use(handleErrors);


(async () => {
    RabbitConnection.connection = await establishRabbitConn(rabbitPort);

    app.listen(expressPort, () => {
        console.log(`Server is running at ${expressPort} port.`);
    });
})();