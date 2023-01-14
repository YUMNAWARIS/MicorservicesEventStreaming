const { Kafka } = require('kafkajs')
require('dotenv').config();

const clientname = `${process.env.clientname}`;
const password = `${process.env.password}`;

console.log(clientname, " ", password)

const sasl = { username: clientname, password, mechanism: 'plain' }
const ssl = !!sasl

const kafka = new Kafka({
    clientId: 'npm-slack-notifier',
    brokers: [`${process.env.bootstrapservers}`],
    ssl,
    sasl
})


module.exports = kafka