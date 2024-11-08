// Importamos NestFactory, uma classe responsável por criar a aplicação NestJS.
import { NestFactory } from '@nestjs/core';
// Importamos o AppModule, o módulo principal da aplicação.
import { AppModule } from './app.module';
// Importamos o ValidationPipe, um middleware que valida os dados recebidos nas requisições.
import { ValidationPipe } from '@nestjs/common';
// Importamos o LoggingInterceptor, um interceptor personalizado que registra as requisições.
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';

async function bootstrap() {
  // Criamos a aplicação NestJS utilizando o AppModule.
  const app = await NestFactory.create(AppModule);

  // Usamos o ValidationPipe globalmente, para que todas as requisições passem por validação.
  app.useGlobalPipes(new ValidationPipe());

  // Usamos o LoggingInterceptor globalmente, para que todas as requisições sejam registradas.
  app.useGlobalInterceptors(new LoggingInterceptor);

  // Iniciamos o servidor na porta definida na variável de ambiente PORT ou na porta 3000, se não definida.
  await app.listen(process.env.PORT ?? 3000);
}

// Executa a função bootstrap para inicializar a aplicação.
bootstrap();
