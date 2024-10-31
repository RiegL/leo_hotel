import { Controller,Get } from '@nestjs/common';
import { UserService } from './users.services';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}


    @Get()
    getUsers(){
        return this.userService.getUsers();
    }
}