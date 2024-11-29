import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { access } from 'fs';
import { AuthLoginDto } from './domain/dto/authLogin.dto';
import * as bcrypt from 'bcrypt';
import { AuthRegisterUserDto } from './domain/dto/authRegister.dto';
import { UserService } from '../users/users.services';
import { CreateUserDto } from '../users/domain/dto/createUser.dto';
import { AuthResetPasswordDTO } from './domain/dto/AuthResetPassword.dto';
import { ValidateTokenDTO } from './domain/dto/validateToken.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { templateHTML } from './utils/templateHTML';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService
  ) {}

  async generateJWT(user: User, expiresIn: string = '1d') {
    const payload = { sub: user.id, name: user.name };
    const options = { expiresIn: expiresIn, issuer: 'leo_hotel', audience: 'users' };

    return { access_token: this.jwtService.sign(payload, options) };
  }

  async login({ email, password }: AuthLoginDto) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    const isPasswordValid =
      password && user.password
        ? await bcrypt.compare(password, user.password)
        : false;

    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    return await this.generateJWT(user);
  }

  async register(body: AuthRegisterUserDto) {
    const newUser: CreateUserDto = {
      email: body.email,
      name: body.name,
      password: body.password,
      role: body.role ?? Role.USER,
    };
    const user = await this.userService.createUsers(newUser);

    return await this.generateJWT(user);
  }

  async reset({ token, password }: AuthResetPasswordDTO) {
    const { valid, decoded } = await this.validateToken(token);
    console.log(valid, decoded);
    
    if (!valid) throw new UnauthorizedException('Token inválido');

    const user = await this.userService.update(Number(decoded.sub), {
      password,
    });

    return await this.generateJWT(user);
  }

  async forgot(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('E-mail inválido');
    }

    const token = await this.generateJWT(user, '30m');

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Recuperação de senha - Leo Hotel',
      html: templateHTML(user.name, token.access_token),
    });
    return `O código de verificação foi enviado para o e-mail ${user.email}`;
  }

 async validateToken(token: string): Promise<ValidateTokenDTO> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
        issuer: 'leo_hotel',
        audience: 'users',
      });
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false, message: error.message };
    }
  }

}