import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './domain/dto/authLogin.dto';
import { AuthRegisterUserDto } from './domain/dto/authRegister.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
     login(@Body() body: AuthLoginDto) {
      return  this.authService.login(body);
    }

    @Post('register')
    @HttpCode(201)
    register(@Body() body: AuthRegisterUserDto) {
      return this.authService.register(body);
    }
}
