import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export interface JwtPayLoad{
    name: string;
    iat?: number;
    expiresIn?: number;
    issues?: string;
    sub:string
    audience?:string
}

export class ValidateTokenDTO{
    @IsBoolean()
    @IsNotEmpty()
    valid: boolean

    decoded?:JwtPayLoad;

    @IsString()
    @IsOptional()
    message?: string
}