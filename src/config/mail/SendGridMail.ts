import sgMail from '@sendgrid/mail';

interface IMailTo {
  name?: string;
  email: string;
}

interface ISendMail {
  to: IMailTo;
  from?: IMailTo;
  text: string;
}

export default class SendGridMail {
  static async sendMail({ to, from, text }: ISendMail) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const msg = {
      to,
      from: from || { email: 'italocovas@gmail.com', name: 'API Vendas' },
      subject: 'Recuperação de senha - API Vendas',
      text,
      name: 'API Vendas',
      // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log(error);
    }
  }
}
