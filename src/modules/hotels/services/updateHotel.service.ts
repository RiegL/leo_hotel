import { Inject, Injectable } from '@nestjs/common';

import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { HOTEL_REPOSITORY_TOKENS } from '../utils/repositoriesTokens';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';

@Injectable()
export class UpdateHotelsService {
  constructor(
    @Inject(HOTEL_REPOSITORY_TOKENS)
    private readonly hotelRepositories: IHotelRepository,
  ) {}

  async update(id: number, UpdateHotelDto: UpdateHotelDto) {
   return this.hotelRepositories.updateHotel(id, UpdateHotelDto);
  }
}
