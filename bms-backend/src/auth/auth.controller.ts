import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { LocalGuard } from "./guards/local.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { Request } from "express";
import { Public } from "src/utils/decorators/public.decorator";
import { AuthPayloadDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Public()
  @Post("recover-account")
  @HttpCode(204)
  @UsePipes(ValidationPipe)
  async recover(@Body() body: AuthPayloadDto) {
    const recoveredUser = await this.authService.recoverUserAccount(body);
    if (!recoveredUser) {
      throw new UnauthorizedException("Invalid credentials.");
    }
    return;
  }

  @Get("status")
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    return { status: "ok" };
  }
}
