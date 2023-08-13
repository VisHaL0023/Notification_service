const amqplib = require('amqplib');

const { EmailService } = require('../services');
const { ServerConfig } = require('../config');

async function connectQueue(){
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();

        await channel.assertQueue("notification-Queue");
        channel.consume("notification-Queue", async (data) => {
            console.log(`${Buffer.from(data.content)}`);

            const object = JSON.parse(`${Buffer.from(data.content)}`);
            await EmailService.sendEmail(
                ServerConfig.GMAIL_EMAIL,
                object.recepientEmail,
                object.subject,
                object.text
            );
            channel.ack(data);
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    connectQueue
}