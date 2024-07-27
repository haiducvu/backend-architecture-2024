const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
})

const producer = kafka.producer()

const runProducer = async () => {
    await producer.connect()
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'Hello KafkaJS user1!', partition: 0 },
            { value: 'Hello KafkaJS user2!', partition: 0 },
            { value: 'Hello KafkaJS user3!', partition: 1 },
        ],
    })

    await producer.disconnect()
}
runProducer().catch((error) => {
    console.log(error);
});