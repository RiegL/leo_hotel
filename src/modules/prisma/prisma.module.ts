// Importamos o decorador Module do NestJS, que nos permite organizar o código em módulos.
import { Module } from "@nestjs/common";
// Importamos o serviço PrismaService, que contém a lógica para interagir com o banco de dados.
import { PrismaService } from "./prisma.service";

// Definimos o módulo PrismaModule, que encapsula o serviço Prisma.
@Module({
   // Definimos os provedores deste módulo. Neste caso, PrismaService é um provedor
   // que estará disponível dentro do PrismaModule.
   providers: [PrismaService],
   
   // Exportamos PrismaService para que ele esteja disponível em outros módulos que importarem o PrismaModule.
   exports: [PrismaService],
})
// Exportamos a classe PrismaModule para que possa ser importada em outros arquivos.
export class PrismaModule {}
