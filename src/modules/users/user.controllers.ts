import { Controller,Get, Post, Body, HttpCode, Param, Patch, Delete, Res} from '@nestjs/common';
import { UserService } from './users.services';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
     listUsers(){
       return this.userService.listUsers();
    }

    @Get(':id')
     getById(@Param('id') id:string){
        return   this.userService.getById(id);
    }


    @Post()
    @HttpCode(201)
     createUsers(@Body() body:any){
      return  this.userService.createUsers(body);
    }

    @Patch(':id')
    @HttpCode(200)
     update(@Param('id') id:string, @Body() body:any){
        return  this.userService.update(id, body);
    }
    
    @Delete(':id')
    @HttpCode(204)
     remove(@Param('id') id:string){
        return  this.userService.remove(id);
    }
}