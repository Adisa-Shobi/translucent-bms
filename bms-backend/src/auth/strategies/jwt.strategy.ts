import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import configuration from "src/config/configuration";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly autservice: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration.jwt.secret,       
    });
  }

  validate(payload: any) {
    return payload;
  }
}
