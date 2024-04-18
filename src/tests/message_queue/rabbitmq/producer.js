const amqp = require('amqplib');

const message = 'hello, RabbitMQ for Tips JS'

const runProducer = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const queueName = 'test-topic';
        await channel.assertQueue(queueName, {
            durable: true
        });
        // send messages to consumer channel
        channel.sendToQueue(queueName, Buffer.from(message));
        console.log('Message sent to queue: ', message);
        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    } catch (error) {
        console.log(error);
    }
}

runProducer().catch((error) => {
    console.log(error);
});

