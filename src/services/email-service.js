const {TicketRepositry} = require('../repositories');
const { MAILER } = require('../config');

const ticketRepo = new TicketRepositry();

async function sendEmail (mailFrom, mailTo, subject, text){
    try {
        const response = await MAILER.sendEmail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createTicket(data){
    try {
        const response = await ticketRepo.create(data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getPendingEmails(){
    try {
        const response = await ticketRepo.getPendingEmails();
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    sendEmail,
    createTicket,
    getPendingEmails
}