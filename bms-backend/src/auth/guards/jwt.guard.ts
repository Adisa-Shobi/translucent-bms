import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { authenticate } from "passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "src/utils/decorators/public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [
        context.getHandler(),
        context.getClass(),
      ],
    );
    if (isPublic) {
      return true;
    }

    // return true;
    let authenticated: boolean | Observable<boolean> = false;
    try {
      authenticated = await super.canActivate(context);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new ForbiddenException("Authentication required.");
      }
      throw error;
    }
    return authenticated;
  }
}
