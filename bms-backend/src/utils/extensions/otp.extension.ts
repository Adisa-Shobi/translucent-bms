import { Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import {
  DefaultArgs,
  DynamicQueryExtensionCb,
  InternalArgs,
} from "@prisma/client/runtime/library";
import configuration from "src/config/configuration";
import { MailerService } from "src/mailer/mailer.service";

export const sendOtpExtension = async ({
  model,
  args,
  operation,
  query,
}: Parameters<
  DynamicQueryExtensionCb<
    Prisma.TypeMap<InternalArgs & DefaultArgs, Prisma.PrismaClientOptions>,
    "model",
    "Otp",
    "upsert" | "create" | "update"
  >
>[0]) => {
  const otp = await query(args);

  const mailerService = new MailerService();

  // dispatch email when a new OTP is created or updated
  if (["create", "update", "upsert"].includes(operation)) {
    // send email
    await mailerService.sendEmail({
      from: {
        name: `Shobi from ${configuration.app.name}`,
        address: configuration.mail.defaultFrom,
      },
      placeholderReplacements: {
        firstName: otp.user.firstName,
        otp: otp.code,
      },
      html: "<p>Hi {firstName}, </p><p>Your OTP is {otp}.</p>",
      recipients: [
        {
          name: `${otp.user.firstName} ${otp.user.lastName}`,
          address: otp.user.email,
        },
      ],
      subject: `Your OTP for ${configuration.app.name}`,
    });
  }
  return otp;
};
