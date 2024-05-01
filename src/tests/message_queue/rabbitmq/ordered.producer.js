'use strict';
const amqp = require('amqplib');
async function consumeOrderedMessage() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queueName = 'ordered-topic-message';
    await channel.assertQueue(queueName, {
        durable: true
    });

    for (let i = 0; i < 7; i++) {
        const message = `ordered-topic-message::${i}`;
        console.log(`message: ${message}`);
        channel.sendToQueue(queueName, Buffer.from(message), {
            persistent: true
        });
    }

    setTimeout(() => {
        connection.close();
        // process.exit(0);
    }, 1000)
}

consumeOrderedMessage().catch((error) => {
    console.log(error);
});