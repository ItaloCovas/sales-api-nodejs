import sgMail from '@sendgrid/mail';
import {
  HandlebarsMailTemplate,
  IParseMailTemplate,
} from './HandlebarsMailTemplate';

interface IMailContact {
  name?: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  templateData: IParseMailTemplate;
  subject: string;
}

export default class SendGridMail {
  static async sendMail({ to, from, templateData, subject }: ISendMail) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const mailTemplate = new HandlebarsMailTemplate();

    const msg = {
      to,
      from: from || { email: 'italocovas@gmail.com', name: 'API Vendas' },
      subject,
      html: await mailTemplate.parse(templateData),
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log(error);
    }
  }
}
