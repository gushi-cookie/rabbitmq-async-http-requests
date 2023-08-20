import { ConsumeMessage } from 'amqplib';
import { establishRabbitConn } from './src/utils/ampq.util.js';


const originalLogFn = console.log;
console.log = function(message: any) {
    originalLogFn(`[M2: Reverse] ${message}`);
};


const rabbitPort = Number(process.env.RABBIT_PORT);
const queueName = 'reverse_queue';


(async () => {
    let connection = await establishRabbitConn(rabbitPort);

    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });

    channel.consume(queueName, (msg: ConsumeMessage | null) => {
        if(!msg) return;

        let result = msg.content.toString().split('').reverse().join('');

        channel.sendToQueue(msg.properties.replyTo, Buffer.from(result), {
            correlationId: msg.properties.correlationId
        });
    });
})();