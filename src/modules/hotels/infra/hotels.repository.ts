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
        throw new Error("Method not implemented.");
    }
    findHotelByName(name: string): Promise<Hotel | null> {
        throw new Error("Method not implemented.");
    }
    findHotels(): Promise<Hotel[]> {
        throw new Error("Method not implemented.");
    }
    updateHotel(id: number, data: CreateHotelDto): Promise<Hotel> {
        throw new Error("Method not implemented.");
    }
    deleteHotel(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    count(): Promise<number> {
        throw new Error("Method not implemented.");
    }
}