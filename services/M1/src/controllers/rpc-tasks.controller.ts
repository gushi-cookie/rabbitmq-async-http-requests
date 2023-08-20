import { Request, Response } from 'express';
import { RabbitConnection, generateUuid } from '../utils/amqp.util.js';
import { Channel, ConsumeMessage } from 'amqplib';
import { createTimeredPromise } from '../utils/promise.util.js';



const timeout = 10000;
let channel: Channel | null = null;

async function reverseText(req: Request, res: Response) {
    // expected query params: text

    let text = req.query.text;
    if(typeof text !== 'string') {
        return res.status(400).json({ message: `Query parameter 'text' must be specified.` });
    }

    if(!RabbitConnection.connection) {
        return res.status(503).json({ message: 'Service is unavailable right now.' });
    }


    if(!channel) channel = await RabbitConnection.connection.createChannel();
    let replyQueue = await channel.assertQueue('', { exclusive: true });
    let correlationId = generateUuid();


    let timer = createTimeredPromise(timeout);

    channel.consume(replyQueue.queue, (msg: ConsumeMessage | null) => {
        if(msg?.properties.correlationId !== correlationId) return;

        res.json({
            message: msg.content.toString(),
        });

        timer.resolve(undefined);
    });

    channel.sendToQueue('reverse_queue', Buffer.from(text), {
        correlationId,
        replyTo: replyQueue.queue,
    });


    await timer.promise;
    if(!timer.state.isResolvedInTime) {
        res.status(400).json({ message: `Couldn't handle request right in time.` });
    }
};


export default {
    reverseText,
};