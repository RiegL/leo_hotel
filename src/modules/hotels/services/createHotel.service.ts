import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';


@Injectable()
export class CreateHotelsService {
  constructor(private readonly hotelRepositories: IHotelRepository) {}
  execute(CreateHotelDto: CreateHotelDto) {
    return this.hotelRepositories.create(CreateHotelDto);
  }
  
}
