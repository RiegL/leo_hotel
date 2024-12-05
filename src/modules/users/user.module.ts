// Importamos os módulos e classes necessários do NestJS e o UserIdCheckMiddleware para validar o id de usuário.
import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controllers";
import { UserService } from "./users.services";
import { PrismaModule } from "../prisma/prisma.module";
import { UserIdCheckMiddleware } from "src/shared/middlewares/userIdCheck.middleware";
import { AuthModule } from "../auth/auth.module";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid';

// Definimos o módulo UserModule, que agrupa o controlador e o serviço do usuário.
@Module({
    // Importa o módulo PrismaModule para uso do PrismaService.
    imports: [PrismaModule, forwardRef(()=> AuthModule),
      MulterModule.register({
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const filename = `${uuidv4()}-${file.originalname}`;
            return cb(null, filename);
          },
        })
      })
    ],
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
