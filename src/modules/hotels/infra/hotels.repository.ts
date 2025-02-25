// hotels.repository.ts
import { Injectable } from '@nestjs/common';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';
import { Hotel } from '@prisma/client';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HotelsRepositories implements IHotelRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateHotelDto, id: number): Promise<Hotel> {
    // Exemplo de criação de hotel com o id do usuário dono
    return this.prisma.hotel.create({ data: { ...data, ownerId: id } });
  }

  async findHotelById(id: number): Promise<Hotel | null> {
    return this.prisma.hotel.findUnique({ where: { id } });
  }

  async findHotelByName(name: string): Promise<Hotel[] | null> {
    return this.prisma.hotel.findMany({ where: { name: { contains: name } } });
  }

  async findHotels(offSet: number, limit: number): Promise<Hotel[]> {
    return this.prisma.hotel.findMany({ skip: offSet, take: limit });
  }

  async findHotelByOwner(ownerId: number): Promise<Hotel[]> {
    return this.prisma.hotel.findMany({ where: { ownerId } });
  }

  async updateHotel(id: number, data: UpdateHotelDto): Promise<Hotel> {
    return this.prisma.hotel.update({ where: { id }, data });
  }

  async deleteHotel(id: number): Promise<Hotel> {
    return this.prisma.hotel.delete({ where: { id } });
  }

  async countHotels(): Promise<number> {
    const result = await this.prisma.hotel.count();
    return result;
  }
}
