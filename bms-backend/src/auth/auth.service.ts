import { Injectable } from "@nestjs/common";
import { AuthPayloadDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "src/database/database.service";
import { comparePassword } from "src/utils/bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private databaseService: DatabaseService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const deletedUser = await this.databaseService.user.findUnique({
      where: { email, markedDeleted: true },
    });
    if (deletedUser) return null;
    const findUser = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
    if (!findUser) return null;
    const isMatch = comparePassword(password, findUser.password);
    if (isMatch) {
      const { password, ...user } = findUser;
      const jwtToken = this.jwtService.sign(user);
      return { access_token: jwtToken };
    }
  }

  async recoverUserAccount({ email, password }: AuthPayloadDto) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    const isMatch = comparePassword(password, user.password);
    if (isMatch) {
      const updatedUser = await this.databaseService.user.update({
        where: { email },
        data: { markedDeleted: false },
      });
      const { password, ...data } = updatedUser;
      return data;
    }
    return null;
  }
}
