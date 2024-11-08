// Importamos PartialType do @nestjs/mapped-types para criar uma versão parcial de CreateUserDto.
// Isso significa que todos os campos de CreateUserDto se tornam opcionais.
import { PartialType } from '@nestjs/mapped-types';
// Importamos CreateUserDto para estender seus campos.
import { CreateUserDto } from './createUser.dto';

// Definimos a classe UpdateUserDto que herda de PartialType, tornando todos os campos de CreateUserDto opcionais.
export class UpdateUserDto extends PartialType(CreateUserDto) {}
