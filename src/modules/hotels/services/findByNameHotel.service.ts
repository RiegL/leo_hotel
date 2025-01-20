import { Inject, Injectable } from '@nestjs/common';
import { HOTEL_REPOSITORY_TOKENS } from '../utils/repositoriesTokens';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';

@Injectable()
export class FindByNameHotelsService {
  constructor(
    @Inject(HOTEL_REPOSITORY_TOKENS)
    private readonly hotelRepositories: IHotelRepository,
  ) {}
  async findByName(name: string) {
    return await this.hotelRepositories.findHotelByName(name);
  }
}
