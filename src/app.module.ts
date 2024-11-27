// Importamos o decorator Module do NestJS para definir um módulo.
import { Module } from '@nestjs/common';

// Importamos o módulo PrismaModule, que fornece o serviço Prisma para interação com o banco de dados.
import { PrismaModule } from './modules/prisma/prisma.module';

// Importamos o módulo UserModule, que contém o controlador e o serviço para gerenciar usuários.
import { UserModule } from './modules/users/user.module';

// Importamos o módulo AuthModule, que contém o controlador e o serviço de autenticação.
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

// Definimos o módulo principal da aplicação, AppModule.
@Module({
  // Especificamos que o AppModule importa PrismaModule e UserModule.
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: 5000,
        limit: 3,
      },
    ]),
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
