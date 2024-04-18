const amqp = require('amqplib');

const runConsumer = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const queueName = 'test-topic';
        await channel.assertQueue(queueName, {
            durable: true
        });
        // send messages to consumer channel
        channel.consume(queueName, (message) => {
            console.log('Received message: ', message.content.toString());
        }, { noAck: true });
        // setTimeout(() => {
        //     connection.close();
        //     process.exit(0);
        // }, 500);
    } catch (error) {
        console.log(error);
    }
}

runConsumer().catch((error) => {
    console.log(error);
});

