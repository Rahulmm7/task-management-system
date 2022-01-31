const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sms = async (mobile, message) => {
    client.messages
        .create({
            body: message,
            from: '+14696207863',
            to: mobile,
        })
        .then((message) => console.log(message.sid))
        .catch((err) => console.log(err));
};

module.exports = sms;
