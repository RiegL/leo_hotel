// Importamos as classes e interfaces necessárias para criar o middleware de validação.
import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// Definimos o middleware UserIdCheckMiddleware, que implementa a interface NestMiddleware.
export class UserIdCheckMiddleware implements NestMiddleware {
  // O método use é chamado para cada requisição que passa pelo middleware.
  use(req: Request, _res: Response, next: NextFunction) {
    // Obtemos o userId a partir dos parâmetros da URL.
    const userId = req.params.id;
    console.log('vendo aqui o userId:', userId);

    // Verificamos se o userId está presente; se não estiver, lançamos uma exceção de requisição inválida.
    if (!userId) {
      throw new BadRequestException('userId is required');
    }
    // Verificamos se o userId é um número válido; se não for, lançamos outra exceção de requisição inválida.
    if (isNaN(Number(userId))) {
      throw new BadRequestException('userId must be a number');
    }

    // Se o userId for válido, continuamos para o próximo middleware ou controlador.
    next();
  }
}
