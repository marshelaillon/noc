import { createTransport } from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface Attachment {
  filename: string;
  path: string;
}

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export class EmailService {
  private transporter = createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = 'Server Logs';
    const htmlBody = `
      <h3>Logs de Sistema - NOC</h3>
      <p>Id cupidatat ipsum fugiat exercitation magna amet consequat sint reprehenderit consequat adipisicing ipsum et sunt. Elit consectetur proident non id commodo incididunt. Exercitation elit aute ad nisi id fugiat ea magna aliquip eu veniam. Minim elit deserunt laborum velit ea in esse magna incididunt. Proident laborum dolor reprehenderit culpa magna qui deserunt ut in. Aute consectetur dolor eu et ad tempor.</p>
    `;
    const attachments: Attachment[] = [
      { filename: 'logs-all-noc.log', path: './logs/logs-all.log' },
      { filename: 'logs-medium-noc.log', path: './logs/logs-medium.log' },
      { filename: 'logs-high-noc.log', path: './logs/logs-high.log' },
    ];
    return this.sendEmail({ to, subject, attachments, htmlBody });
  }
}
