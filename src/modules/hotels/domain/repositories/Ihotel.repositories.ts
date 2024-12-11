import { Hotel } from "@prisma/client";
import { CreateHotelDTO } from "../dto/create-hotel.dto";

export interface IHotelRepository {
    create(data: CreateHotelDTO): Promise<Hotel>;
    findHotelById(id: number): Promise<Hotel | null>;
    findHotelByName(name: string): Promise<Hotel | null>;
    findHotels(): Promise<Hotel[]>;
    updateHotel(id: number, data: CreateHotelDTO): Promise<Hotel>;
    deleteHotel(id: number): Promise<void>;
    count(): Promise<number>;
    }
    