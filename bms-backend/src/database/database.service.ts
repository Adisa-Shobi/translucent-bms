import {
  Injectable,
  Logger,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { DynamicClientExtensionThis } from "@prisma/client/runtime/library";
import { sendOtpExtension } from "src/utils/extensions/otp.extension";

export const customPrismaClient = (prismaClient: PrismaClient) => {
  return prismaClient.$extends({
    query: {
      otp: {
        create: sendOtpExtension,
        upsert: sendOtpExtension,
        update: sendOtpExtension,
      },
    },
  });
};

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;

export class PrismaClientExtended extends PrismaClient {
  customPrismaClient: CustomPrismaClient;

  get client() {
    if (!this.customPrismaClient) {
      this.customPrismaClient = customPrismaClient(this);
    }

    return this.customPrismaClient;
  }
}

@Injectable()
export class DatabaseService extends PrismaClientExtended
  implements OnModuleInit {
  async onModuleInit() {
    await this.client.$connect();
    Logger.log("==================== Database connected ====================");
  }
}
