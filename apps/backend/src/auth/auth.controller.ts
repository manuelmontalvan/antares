import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {}


@Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, description: 'Login successfully.' })
async login(@Body() dto: LoginDto) {
return this.authService.login(dto.username, dto.password);
}
}