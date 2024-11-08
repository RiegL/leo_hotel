// Importamos as classes de exceção e PrismaService para manipular dados no banco e lançar exceções quando necessário.
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './domain/dto/createUser.dto';
import { UpdateUserDto } from './domain/dto/updateUser.dto';

// Define o serviço UserService com a lógica de manipulação de usuários.
@Injectable()
export class UserService {
  // Injetamos o PrismaService através do construtor para interagir com o banco de dados.
  constructor(private readonly prisma: PrismaService) {}

  // Método para criar um usuário com base nos dados de CreateUserDto.
  async createUsers(body: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: body });
  }

  // Método para listar todos os usuários.
  async listUsers() {
    return await this.prisma.user.findMany();
  }

  // Método para obter um usuário pelo id, lançando exceção se não encontrado.
  async getById(id: number) {
    const user = await this.isIdExists(id);
    return user;
  }

  // Método para atualizar os dados de um usuário específico.
  async update(id: number, body: UpdateUserDto) {
    await this.isIdExists(id);
    return await this.prisma.user.update({
      where: { id },
      data: body,
    });
  }

  // Método para remover um usuário específico pelo id.
  async remove(id: number) {
   await this.isIdExists(id);
   return await this.prisma.user.delete({ where: { id } });
  }

  // Método privado para verificar se um usuário existe pelo id.
  private async isIdExists(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
