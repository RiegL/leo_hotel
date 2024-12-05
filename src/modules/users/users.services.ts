// Importamos as classes de exceção e PrismaService para manipular dados no banco e lançar exceções quando necessário.
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
import * as bcrypt from 'bcrypt';
import { userSelectFields } from '../prisma/utils/userSelectFields';
import { join, resolve } from 'path';
import { stat, unlink } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';

// Define o serviço UserService com a lógica de manipulação de usuários.
@Injectable()
export class UserService {
  // Injetamos o PrismaService através do construtor para interagir com o banco de dados.
  constructor(private readonly prisma: PrismaService) {}

  // Método para criar um usuário com base nos dados de CreateUserDto.
  async createUsers(body: CreateUserDto): Promise<User> {

    const existingEmail = await this.prisma.user.findUnique({
      where: { email: body.email },
    })

    if (existingEmail) {
      throw new HttpException('E-mail já cadastrado', HttpStatus.BAD_REQUEST);
    }

    body.password = await this.hasPassword(body.password);
    return await this.prisma.user.create({
      data: body,
      select: userSelectFields,
    });
  }

  // Método para listar todos os usuários.
  async listUsers() {
    return await this.prisma.user.findMany({
      select: userSelectFields,
    });
  }

  // Método para obter um usuário pelo id, lançando exceção se não encontrado.
  async getById(id: number) {
    const user = await this.isIdExists(id);
    return user;
  }

  // Método para atualizar os dados de um usuário específico.
  async update(id: number, body: UpdateUserDto) {
    await this.isIdExists(id);

    if (body.password) {
      body.password = await this.hasPassword(body.password);
    }

    return await this.prisma.user.update({
      where: { id },
      data: body,
      select: userSelectFields,
    });
  }

  // Método para remover um usuário específico pelo id.
  async remove(id: number) {
    await this.isIdExists(id);
    return await this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email }
    });
  }


  async uploadAvatar(id: number, avatarFilename: string) {
    const user = await this.isIdExists(id);
  
    // Define o diretório de uploads
    const directory = resolve(__dirname, '..', '..', '..', 'uploads');
  
    // Garante que a pasta de uploads existe
    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
    }
  
    // Verifica e remove o avatar antigo, se existir
    if (user.avatar) {
      const userAvatarPath = join(directory, user.avatar);
      try {
        // Verifica se o arquivo existe antes de tentar removê-lo
        await stat(userAvatarPath);
        await unlink(userAvatarPath); // Remove o arquivo
      } catch (error) {
        if (error.code !== 'ENOENT') {
          // Lança outros erros que não sejam "Arquivo não encontrado"
          console.error('Erro ao verificar/remover o avatar antigo:', error);
          throw error;
        }
      }
    }
  
    // Atualiza o registro do usuário com o novo avatar
    const userUpdate = await this.update(id, { avatar: avatarFilename });
  
    
    return userUpdate;
  }


  // Método privado para verificar se um usuário existe pelo id.
  private async isIdExists(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userSelectFields,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async hasPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
