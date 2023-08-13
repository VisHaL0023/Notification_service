const { EmailService } = require('../services');

async function create(req, res){
    try {
        const resposne = await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail
        });
        return res.status(201).json(resposne);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    create
}