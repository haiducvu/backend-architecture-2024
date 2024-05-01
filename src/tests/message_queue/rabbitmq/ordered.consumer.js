'use strict';
const amqp = require('amqplib');
async function consumeOrderedMessage() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queueName = 'ordered-topic-message';
    await channel.assertQueue(queueName, {
        durable: true
    });

    // Set preferred queue to 1 to ensure that only one ack at a time
    channel.prefetch(1);

    channel.consume(queueName, msg => {
        const message = msg.content.toString();
        setTimeout(() => {
            console.log(`processed: ${message}`);
            channel.ack(msg);
        }, Math.random() * 1000);
    })
}

consumeOrderedMessage().catch((error) => {
    console.log(error);
});