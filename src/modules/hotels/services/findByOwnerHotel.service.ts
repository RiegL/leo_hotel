import { Inject, Injectable } from '@nestjs/common';
import { HOTEL_REPOSITORY_TOKENS } from '../utils/repositoriesTokens';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';

@Injectable()
export class FindByOwnerHotelsService {
  constructor(
    @Inject(HOTEL_REPOSITORY_TOKENS)
    private readonly hotelRepositories: IHotelRepository,
  ) {}
  async findByOwner(ownerId: string) {
    return await this.hotelRepositories.findHotelByOwner(Number(ownerId));
  }
}
