import { Hotel } from "@prisma/client";
import { CreateHotelDto } from "../dto/create-hotel.dto";

export interface IHotelRepository {
    create(data: CreateHotelDto): Promise<Hotel>;
    findHotelById(id: number): Promise<Hotel | null>;
    findHotelByName(name: string): Promise<Hotel | null>;
    findHotels(): Promise<Hotel[]>;
    updateHotel(id: number, data: CreateHotelDto): Promise<Hotel>;
    deleteHotel(id: number): Promise<void>;
    count(): Promise<number>;
    }
    