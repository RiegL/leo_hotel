import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class UserMatch implements CanActivate{
    canActivate(context: ExecutionContext) {
        const id = context.switchToHttp().getRequest().params.id
        const user = context.switchToHttp().getRequest().user

        if(user.id !== Number(id)){
            throw new UnauthorizedException('Você não tem permissão para isso')
        } 

        return true;

    }
}