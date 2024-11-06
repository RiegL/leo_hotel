import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './domain/dto/createUser.dto';
import { UpdateUserDto } from './domain/dto/updateUser.dto';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUsers(body: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: body });
  }

  async listUsers() {
    return await this.prisma.user.findMany();
  }

  async getById(id: number) {
    const user = await this.isIdExists(id);
    return user;
  }
  async update(id: number, body: UpdateUserDto) {
    await this.isIdExists(id);
    return await this.prisma.user.update({
      where: { id },
      data: body,
    });
  }

  async remove(id: number) {
   await this.isIdExists(id);
   return await this.prisma.user.delete({ where: { id} });
  }

  private async isIdExists(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id},
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
