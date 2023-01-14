const express = require('express');
const kafka = require('./kafka');
const producer = kafka.producer();

producer.connect()
    .then(result => {
        server_set_up();
        console.log(result);
    })
    .catch(err => {
        console.log(err)
    })


const server_set_up = () => {
    const app = express();
    app.use('/', async (req, res, next) => {
        try {
            const responses = await producer.send({
                topic: `${process.env.kafkatopic}`,
                messages: [{
                    key: req.url,
                    value: JSON.stringify({
                        name: "Yumna Waris",
                        age: "21"
                    })
                }]
            })
            console.log('Published message', { responses });
            res.json({
                Published_message: responses
            })
        } catch (error) {
            console.error('Error publishing message', error)

        }
    })
    app.listen(3000, () => console.log("Server is listening on port 3000."));
}


// server.on('package:publish', async event => {
//     try {
//         const responses = await producer.send({
//             topic: process.env.TOPIC,
//             messages: [{
//                 // Name of the published package as key, to make sure that we process events in order
//                 key: event.name,
//                 // The message value is just bytes to Kafka, so we need to serialize our JavaScript
//                 // object to a JSON string. Other serialization methods like Avro are available.
//                 value: JSON.stringify({
//                     package: event.name,
//                     version: event.version
//                 })
//             }]
//         })

//         console.log('Published message', { responses })
//     } catch (error) {
//         console.error('Error publishing message', error)
//     }
// })
