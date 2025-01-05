import { BadRequestException, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { generate } from "otp-generator";

const OTP_DURATION = 1 * 60 * 1000; // 1 minute(s)

@Injectable()
export class OtpService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async createOtp(userId: string) {
    const user = await this.databaseService.client.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new BadRequestException("User not found");

    const code = generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    return this.databaseService.client.otp.create({
      data: {
        code,
        expiresAt: new Date(Date.now() + OTP_DURATION),
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {user: true},
    });
  }
}
