// Importamos o tipo Role do Prisma Client, que representa os possíveis valores para a função (role) do usuário.
import { Role } from "@prisma/client";
// Importamos os decoradores do class-validator para validar os campos.
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

// Definimos a classe CreateUserDto que representa os dados necessários para criar um usuário.
export class CreateUserDto {
    // Valida que o campo name deve ser uma string e não pode estar vazio.
    @IsString()
    @IsNotEmpty()
    name: string;

    // Valida que o campo email deve ser um email válido e não pode estar vazio.
    @IsEmail()
    @IsNotEmpty()
    email: string;

    // Valida que o campo password deve ser uma string e não pode estar vazio.
    @IsString()
    @IsNotEmpty()
    password: string;

    // Valida que o campo role deve ser uma string e deve corresponder a um valor do enum Role.
    @IsString()
    @IsEnum(Role)
    role: Role;

    @IsOptional()
    avatar?:string;
}
