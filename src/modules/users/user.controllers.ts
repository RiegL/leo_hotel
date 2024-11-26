// Importamos os decoradores e classes necessárias do NestJS, além do serviço UserService, que contém a lógica do usuário.
import { Controller, Get, Post, Body, HttpCode, Patch, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './users.services';
import { CreateUserDto } from './domain/dto/createUser.dto';
import { UpdateUserDto } from './domain/dto/updateUser.dto';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guards';
import { User } from 'src/shared/decorators/user.decorator';
import { Role, User as UserType } from '@prisma/client';
import { Roles } from 'src/shared/decorators/roles.decorators';
import { RoleGuard } from 'src/shared/guards/role.guards';
import { UserMatch } from 'src/shared/guards/userMatch.guard';

// Definimos o controlador de rota para 'users' e injetamos o UserService para manipulação de dados de usuário.
@UseGuards(AuthGuard,RoleGuard )
@Controller('users')
export class UserController {
    // Injetamos UserService através do construtor, para usá-lo nos métodos de controle.
    constructor(private userService: UserService) {}

    // Define a rota GET para listar todos os usuários.
    @Get()
    listUsers(@User('email') user: UserType) {
        console.log(user);
       return this.userService.listUsers();
    }

    // Define a rota GET com parâmetro id, usando ParseIntPipe para validar que o id é um número.
    @Get(':id')
    getById(@ParamId() id: number) {
        return this.userService.getById(id);
    }

    // Define a rota POST para criar um novo usuário com status 201 e valida o corpo da requisição com CreateUserDto.
    @Roles(Role.ADMIN)
    @Post()
    @HttpCode(201)
    createUsers(@Body() body: CreateUserDto) {
      return this.userService.createUsers(body);
    }

    // Define a rota PATCH para atualizar um usuário específico por id, aplicando ParseIntPipe ao parâmetro.
    @UseGuards(UserMatch)
    @Patch(':id')
    @HttpCode(200)
    update(@ParamId() id: number, @Body() body: UpdateUserDto) {
        return this.userService.update(id, body);
    }
    
    // Define a rota DELETE para remover um usuário específico pelo id com status 204.
    @UseGuards(UserMatch)
    @Delete(':id')
    @HttpCode(204)
    remove(@ParamId() id: number) {
        return this.userService.remove(id);
    }
}
