import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DatabaseService } from "src/database/database.service";
import { hashPassword } from "src/utils/bcrypt";
import { Pagination } from "src/global-validators";

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  visibleFields = {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    profilePhoto: true,
    createdAt: true,
    updatedAt: true,
  };

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.databaseService.user.findUnique(
      {
        where: { email: createUserDto.email },
      },
    );

    if (existingUser) return null

    const password = hashPassword(createUserDto.password);
    return this.databaseService.user.create({
      data: { ...createUserDto, password },
      select: this.visibleFields,
    });
  }

  async findAll(pagination: Pagination) {
    return this.databaseService.user.findMany(
      {
        where: {
          markedDeleted: false,
        },
        select: this.visibleFields,
        skip: pagination.skip,
        take: pagination.limit,
      },
    );
  }

  async findOne(id: string) {
    return this.databaseService.user.findUnique(
      {
        where: {
          id,
          markedDeleted: false,
        },
        select: this.visibleFields,
      },
    );
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.databaseService.user.update(
      {
        where: {
          id,
          markedDeleted: false,
        },
        data: updateUserDto,
        select: this.visibleFields,
      },
    );
  }

  async remove(id: string) {
    return this.databaseService.user.update(
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
    return this.databaseService.user.update(
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
