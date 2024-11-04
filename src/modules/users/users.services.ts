import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUsers(body: any): Promise<User> {
    return await this.prisma.user.create({ data: body });
  }
  async listUsers() {
    return await this.prisma.user.findMany();
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async update(id: string, body: any) {
    return await this.prisma.user.update({
      where: { id: Number(id) },
      data: body,
    });
    
  }
  
  async remove(id: string) {
    const user = await this.prisma.user.delete({ where: { id: Number(id) } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
