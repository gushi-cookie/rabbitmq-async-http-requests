import { Connection } from 'amqplib';
import { createTimeredPromise } from './promise.util.js';
import amqplib from 'amqplib';


export async function establishRabbitConn(port: number): Promise<Connection> {
    let delay = 1000;
    let counter = 1;
    let conn: Connection | null = null;

    let timer = createTimeredPromise(10000);
    let recursion = async () => {
        try {
            console.log(`Trying connect to the rabbit server... Attempt: ${counter}.`);
            conn = await amqplib.connect('amqp://rabbit', { port });
            console.log(`Rabbit connection has been established.`);
            timer.resolve(undefined);
        } catch(error: any) {
            counter++;
            if(!timer.state.isResolved) setTimeout(recursion, delay);
        }
    };

    recursion();
    await timer.promise;

    if(!conn) throw new Error(`Couldn't establish a rabbit connection in time.`);
    return conn;
};