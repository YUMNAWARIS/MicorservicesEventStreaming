const kafka = require('./kafka');
const consumer = kafka.consumer({ groupId: "yumna-messagess" });

consumer.connect()
    .then(async (result) => {
        console.log(result);
        await consumer.subscribe({
            topic: `${process.env.kafkatopic}`,
            fromBeginning: true
        })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log('Received message', {
                    topic,
                    partition,
                    key: message.key.toString(),
                    value: message.value.toString()
                })
            }
        })
    })
    .catch(error => { console.log(error) })