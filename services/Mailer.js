const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');

class Mailer {
  constructor({ subject, recipients }, content) {
    sgMail.setApiKey(keys.sendGridKey);
    this.to = recipients.map(({ email }) => email);
    this.from = 'no-reply@emaily.com';
    this.subject = subject;
    this.html = content;
  }

  async send() {
    let response;
    try {
      response = await sgMail.send(this, true);
    } catch (error) {
      console.error(error);
    }
    return response;
  }
}

module.exports = Mailer;
