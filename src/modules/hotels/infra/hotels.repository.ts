import { Hotel } from "@prisma/client";
import { CreateHotelDto } from "../domain/dto/create-hotel.dto";
import { IHotelRepository } from "../domain/repositories/Ihotel.repositories";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class HotelsRepositories implements IHotelRepository {
    constructor(private readonly prisma: PrismaService) {}
    create(data: CreateHotelDto): Promise<Hotel> {
        return this.prisma.hotel.create({ data });
    }

    findHotelById(id: number): Promise<Hotel | null> {
        return this.prisma.hotel.findUnique({where: {id}});
    }
    findHotelByName(name: string): Promise<Hotel | null> {
        return this.prisma.hotel.findFirst({where: {name}});
    }
    findHotels(): Promise<Hotel[]> {
        return this.prisma.hotel.findMany();
    }

    findHotelByOwner(ownerId: number): Promise<Hotel[]> {
        return this.prisma.hotel.findMany({where: {ownerId}})
    }

    updateHotel(id: number, data: CreateHotelDto): Promise<Hotel> {
        console.log(id,data);   
        return null;
    }
    deleteHotel(id: number): Promise<void> {
        console.log(id); 
        return null; 
    }
    
}