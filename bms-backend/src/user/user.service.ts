import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DatabaseService } from "src/database/database.service";
import { hashPassword } from "src/utils/bcrypt";
import { Pagination } from "src/global-validators";
import { MailerService } from "src/mailer/mailer.service";
import configuration from "src/config/configuration";
import { OtpService } from "src/otp/otp.service";

export const visibleFields = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profilePhoto: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly mailerService: MailerService,
    private readonly otpService: OtpService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.databaseService.client.user.findUnique(
      {
        where: { email: createUserDto.email },
      },
    );

    if (existingUser) return null;

    const password = hashPassword(createUserDto.password);
    const user = await this.databaseService.client.user.create({
      data: { ...createUserDto, password },
      select: visibleFields,
    });

    // this.mailerService.sendEmail({
    //   from: {
    //     name: `Shobi from ${configuration.app.name}`,
    //     address: configuration.mail.defaultFrom,
    //   },
    //   placeholderReplacements: {
    //     firstName: user.firstName,
    //     appName: configuration.app.name,
    //   },
    //   html: "<p>Hi {firstName}, </p><p>Welcome to {appName}.</p>",
    //   recipients: [{
    //     name: `${user.firstName} ${user.lastName}`,
    //     address: user.email,
    //   }],
    //   subject: `Welcome to ${configuration.app.name}`,
    // });

    this.otpService.createOtp(user.id);

    return user;
  }

  async findAll(pagination: Pagination) {
    return this.databaseService.client.user.findMany(
      {
        where: {
          markedDeleted: false,
        },
        select: visibleFields,
        skip: pagination.skip,
        take: pagination.limit,
      },
    );
  }

  async findOne(id: string) {
    return this.databaseService.client.user.findUnique(
      {
        where: {
          id,
          markedDeleted: false,
        },
        select: visibleFields,
      },
    );
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.databaseService.client.user.update(
      {
        where: {
          id,
          markedDeleted: false,
        },
        data: updateUserDto,
        select: visibleFields,
      },
    );
  }

  async remove(id: string) {
    return this.databaseService.client.user.update(
      {
        where: {
          id,
          markedDeleted: false,
        },
        data: {
          markedDeleted: true,
        },
      },
    );
  }

  async recover(id: string) {
    return this.databaseService.client.user.update(
      {
        where: {
          id,
          markedDeleted: true,
        },
        data: {
          markedDeleted: false,
        },
      },
    );
  }
}
