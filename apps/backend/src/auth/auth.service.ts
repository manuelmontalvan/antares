import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

private readonly user = { id: 1, username: 'admin', password: 'admin123', roles: ['admin'] };


constructor(private readonly jwtService: JwtService) {}


async validateCredentials(username: string, password: string) {
if (username === this.user.username && password === this.user.password) {
const { password, ...result } = this.user as any;
return result;
}
return null;
}


async login(username: string, password: string) {
const user = await this.validateCredentials(username, password);
if (!user) throw new UnauthorizedException('Invalid credentials');


const payload = { sub: user.id, username: user.username, roles: user.roles };
return { accessToken: this.jwtService.sign(payload) };
}
}