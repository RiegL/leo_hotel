import { Module } from "@nestjs/common";
import { UserController } from "./user.controllers";
import { UserService } from "./users.services";

@Module({
    imports:[],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})

export  class UserModule{}