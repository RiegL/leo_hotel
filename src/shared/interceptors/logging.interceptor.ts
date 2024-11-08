// Importamos as interfaces e classes necessárias para criar um interceptor.
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

// Definimos o interceptor LoggingInterceptor, que implementa a interface NestInterceptor.
export class LoggingInterceptor implements NestInterceptor {
    // O método intercept é chamado para cada requisição que passa pelo interceptor.
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Registramos o tempo atual para calcular o tempo de execução.
        const now = Date.now();

        // Continuamos o fluxo da requisição e usamos o operador tap para realizar uma ação após a execução.
        return next.handle().pipe(
            tap(() => { 
                // Obtemos o objeto de requisição HTTP a partir do contexto.
                const request = context.switchToHttp().getRequest();
                // const response = context.switchToHttp().getResponse(); // Pode ser utilizado para manipular a resposta, se necessário.

                // Exibimos no console a URL da requisição e o tempo decorrido desde o início.
                console.log(`Url: ${request.url}`);
                console.log(`After ${Date.now() - now}ms`);
            })
        );	
    }
}
