import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import mailConfig from '@config/mail/mail';
import {
  HandlebarsMailTemplate,
  IParseMailTemplate,
} from './HandlebarsMailTemplate';

interface IMailContact {
  name: string;
  address: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  templateData: IParseMailTemplate;
  subject: string;
}

export default class SASMail {
  static async sendMail({ to, from, templateData, subject }: ISendMail) {
    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: mailConfig.region,
        credentials: {
          accessKeyId: mailConfig.credentials.accessKey,
          secretAccessKey: mailConfig.credentials.secret,
        },
      }),
    });

    const { email, name } = mailConfig.defaults.from;

    await transporter.sendMail({
      from: {
        address: from?.address || email,
        name: from?.name || name,
      },
      to: {
        address: to.address,
        name: to.name,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
  }
}
