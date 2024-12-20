import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import { UserService } from "src/modules/users/users.services";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ){}


   async canActivate(context: ExecutionContext){
        const request =  context.switchToHttp().getRequest();
        const { authorization } = request.headers

        if(!authorization || !authorization.startsWith('Bearer '))throw new UnauthorizedException('Token inválido');

        const token = authorization.split(' ')[1];   
        
        const {valid, decoded} =  await this.authService.validateToken(token);

        if(!valid)  throw new UnauthorizedException('Token inválido');
           
        const user = await this.userService.getById(Number(decoded.sub));

        if(!user) return false

        request.user = user
       
        return true
    }
}