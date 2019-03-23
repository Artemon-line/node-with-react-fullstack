const sendGrid = require('sendgrid');
const helper = sendGrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    // connect to API
    this.sgApi = sendGrid(keys.sendGridKey);

    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    // track clicks
    this.addContent(this.body);

    this.addClickTracking();

    // recipients list
    this.addRecipients();
  }

  formatAddresses(recipients) {
    const addresses = recipients.map(({ email }) => {
      return new helper.Email(email);
    });
    return addresses;
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      console.log(recipient);

      personalize.addTo(recipient);
    });
  }

  async send() {
    let response;
    try {
      const request = this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: this.toJSON()
      });
      response = await this.sgApi.API(request);
    } catch (error) {
      console.error(error);
    }
    return response;
  }
}

module.exports = Mailer;
