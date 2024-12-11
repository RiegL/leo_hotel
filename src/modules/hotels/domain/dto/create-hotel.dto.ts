import { IsDecimal, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateHotelDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;
    
    @IsString()
    @MaxLength(255)
    description: string;
    
    @IsString()
    @MaxLength(255)
    image: string;
    
    @IsDecimal()
    price: string;
    
    @IsString()
    address: string;
    
    @IsNumber()
    ownerId: number;
    }
    