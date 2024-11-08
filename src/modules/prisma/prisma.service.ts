// Importamos os decoradores Injectable e OnModuleInit do NestJS.
// Injectable permite que o PrismaService seja injetado em outras partes da aplicação como uma dependência.
// OnModuleInit é uma interface usada para definir uma lógica a ser executada na inicialização do módulo.
import { Injectable, OnModuleInit } from "@nestjs/common";
// Importamos PrismaClient do cliente Prisma para interagir com o banco de dados.
import { PrismaClient } from "@prisma/client";

// Decorador Injectable indica que esta classe pode ser injetada como uma dependência.
@Injectable()
// Definimos a classe PrismaService que estende PrismaClient e implementa OnModuleInit.
export class PrismaService extends PrismaClient implements OnModuleInit {
    // Construtor que chama o super para inicializar o PrismaClient.
    constructor() {
        super();
    }

    // Método onModuleInit é executado automaticamente quando o módulo é iniciado.
    // Aqui, fazemos a conexão com o banco de dados usando o método $connect do Prisma.
    async onModuleInit() {
        await this.$connect();
    }

    // Método onAppAplicationShutdow é executado quando a aplicação é encerrada.
    // Desconecta do banco de dados chamando o método $disconnect do Prisma.
    async onAppAplicationShutdow() {
        await this.$disconnect();
    }
}
