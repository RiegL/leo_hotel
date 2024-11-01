import { Controller,Get, Post, Body, HttpCode, Param, Patch, Delete, Res} from '@nestjs/common';
import { UserService } from './users.services';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}


    @Get()
    async list(){
       return  await this.userService.list();
    }

    @Get(':id')
    async getById(@Param('id') id:string){
        return  await this.userService.getById(id);
    }


    @Post()
    @HttpCode(201)
    async createUsers(@Body() body:any){
      return await this.userService.createUsers(body);
    }

    @Patch(':id')
    @HttpCode(200)
    async update(@Param('id') id:string, @Body() body:any){
        return await this.userService.update(id, body);
    }
    
    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id:string){
        return await this.userService.remove(id);
    }
}