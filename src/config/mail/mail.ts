interface IMailConfig {
  driver: 'sendgrid' | 'ses';
  region: string;
  credentials: {
    accessKey: string;
    secret: string;
  };
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'sendgrid',
  region: process.env.AWS_REGION,
  credentials: {
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
  },
  defaults: {
    from: {
      email: 'italocovas@italolab016.me',
      name: 'Suporte Lab 016',
    },
  },
} as IMailConfig;
