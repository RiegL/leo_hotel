// Importamos os módulos e classes necessários do NestJS e o UserIdCheckMiddleware para validar o id de usuário.
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controllers";
import { UserService } from "./users.services";
import { PrismaModule } from "../prisma/prisma.module";
import { UserIdCheckMiddleware } from "src/shared/middlewares/userIdCheck.middleware";

// Definimos o módulo UserModule, que agrupa o controlador e o serviço do usuário.
@Module({
    // Importa o módulo PrismaModule para uso do PrismaService.
    imports: [PrismaModule],
    // Define o UserController como controlador do módulo.
    controllers: [UserController],
    // Define o UserService como provedor do módulo.
    providers: [UserService],
    // Exporta UserService para que esteja disponível em outros módulos que importem UserModule.
    exports: [UserService]
})
export class UserModule implements NestModule {
    // Configura o middleware para validar o id do usuário nas rotas GET, PATCH e DELETE.
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(UserIdCheckMiddleware)
          .forRoutes(
            { path: 'users/:id', method: RequestMethod.GET },
            { path: 'users/:id', method: RequestMethod.PATCH },
            { path: 'users/:id', method: RequestMethod.DELETE },
          );
    }
}
