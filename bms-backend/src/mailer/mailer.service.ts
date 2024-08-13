import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import configuration from "src/config/configuration";
import { SendMailDto } from "./dto/send-mail.dto";
import Mail from "nodemailer/lib/mailer";

@Injectable()
export class MailerService {
  mailTransporter() {
    const transporter = nodemailer.createTransport({
      host: configuration.mail.host,
      port: configuration.mail.port,
      auth: {
        user: configuration.mail.user,
        pass: configuration.mail.pass,
      },
    });

    return transporter;
  }

  template(html: string, replacements: Record<string, string>) {
    return html.replace(
      /{(\w*)}/g, // or /%(\w*)%/g for "{this} instead of %this%"
      function (m, key) {
        return replacements.hasOwnProperty(key) ? replacements[key] : "";
      },
    );
  }

  async sendEmail(data: SendMailDto) {
    const { from, recipients, placeholderReplacements, subject } = data;
    const html = data.placeholderReplacements
      ? this.template(data.html, placeholderReplacements)
      : data.html;
    const transporter = this.mailTransporter();

    const options: Mail.Options = {
      from: from || {
        name: configuration.app.name,
        address: configuration.mail.defaultFrom,
      },
      to: recipients,
      subject,
      html,
    };

    try {
      transporter.sendMail(options);
    } catch (error) {
      Logger.error(error);
    }
  }
}
