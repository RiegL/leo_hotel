import { Controller,Get, Post, Body, HttpCode, Param, Patch, Delete, Res, ParseIntPipe, UseInterceptors} from '@nestjs/common';
import { UserService } from './users.services';
import { User } from '@prisma/client';
import { CreateUserDto } from './domain/dto/createUser.dto';
import { UpdateUserDto } from './domain/dto/updateUser.dto';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}
    
    @Get()
     listUsers(){
       return this.userService.listUsers();
    }

    @Get(':id')
     getById(@Param('id', ParseIntPipe) id:number){
        return   this.userService.getById(id);
    }


    @Post()
    @HttpCode(201)
     createUsers(@Body() body:CreateUserDto ){
      return  this.userService.createUsers(body);
    }

    @Patch(':id')
    @HttpCode(200)
     update(@Param('id',ParseIntPipe) id:number, @Body() body:UpdateUserDto){
        return  this.userService.update(id, body);
    }
    
    @Delete(':id')
    @HttpCode(204)
     remove(@Param('id',ParseIntPipe) id:number){
        return  this.userService.remove(id);
    }
}