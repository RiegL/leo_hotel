import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { access } from 'fs';
import { AuthLoginDto } from './domain/dto/authLogin.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthRegisterUserDto } from './domain/dto/authRegister.dto';
import { UserService } from '../users/users.services';
import { CreateUserDto } from '../users/domain/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService
  ) {}

  async generateJWT(user: User) {
    const payload = { sub: user.id, name: user.name };
    const options = { expiresIn: '1d', issuer: 'leo_hotel', audience: 'users' };

    return { access_token: this.jwtService.sign(payload, options) };
  }

  async login({ email, password }: AuthLoginDto) {
    const user = await this.userService.findByEmail(email);

    if (!user || await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException ("E-mail ou senha inválidos" );
    }
    return await this.generateJWT(user);
  }

  async register(body: AuthRegisterUserDto){

    const newUser : CreateUserDto = {
      email: body.email,
      name: body.name,
      password: body.password,
      role: body.role ?? Role.USER,
    };
    const user = await this.userService.createUsers(newUser);
    
    return await this.generateJWT(user);
  }
}
