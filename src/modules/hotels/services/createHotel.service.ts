import { Inject, Injectable } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';
import { HOTEL_REPOSITORY_TOKENS } from '../utils/repositoriesTokens';


@Injectable()
export class CreateHotelsService {
  constructor(
    @Inject(HOTEL_REPOSITORY_TOKENS)
    private readonly hotelRepositories: IHotelRepository,
  ) {}
  async execute(CreateHotelDto: CreateHotelDto) {
    return await this.hotelRepositories.create(CreateHotelDto);
  }
  
}
