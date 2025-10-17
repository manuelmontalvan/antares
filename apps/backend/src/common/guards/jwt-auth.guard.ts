import { ExecutionContext, Injectable,UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
canActivate(context: ExecutionContext) {
// Optionally, you can add custom logic here
return super.canActivate(context);
}


handleRequest(err: any, user: any, info: any) {
// Customize error handling
if (err || !user) {
throw err || new UnauthorizedException('Unauthorized');
}
return user;
}
}