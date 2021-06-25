export class AppSettings {
    mail: string;
    contact_first: string;
    contact_second: string;
    notification_mail: string;

  constructor(options: {
    mail: string;
    contact_first: string;
    contact_second: string;
    notification_mail: string;
  }) {
    this.mail = options.mail;
    this.contact_first = options.contact_first;
    this.contact_second = options.contact_second;
    this.notification_mail = options.notification_mail;
  }
}
