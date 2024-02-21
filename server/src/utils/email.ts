import nodemailer from 'nodemailer';
import pug from 'pug';
import { convert } from 'html-to-text';
import { Prisma } from '@prisma/client';

const smtp = {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
};

export default class Email {
  #pseudo: string;
  #to: string;
  #from: string;
  constructor(private user: Prisma.UserCreateInput, private url: string) {
    this.#pseudo = user.pseudo.split(' ')[0];
    this.#to = user.email;
    this.#from = `Relaxing Hippoquests <team@relaxing-hippoquests.com>`;
  }

  private newTransport() {
    return nodemailer.createTransport({
      ...smtp,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  private async send(template: string, subject: string) {
    try {
      // Generate HTML template based on the template string
      const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
        pseudo: this.#pseudo,
        subject,
        url: this.url,
      });

      // Create mailOptions
      const mailOptions = {
        from: this.#from,
        to: this.#to,
        subject,
        text: convert(html),
        html,
      };

      // Send email
      const info = await this.newTransport().sendMail(mailOptions);
      console.log(nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.error('Error during send mail :', error);
    }
  }

  async sendVerificationCode() {
    await this.send('verificationCode', `Votre code d'activation de compte`);
  }

  async sendPasswordResetToken() {
    await this.send(
      'resetPassword',
      'Votre réinitialisation de mot de passe (valide pour seulement 10 minutes)'
    );
  }
}
