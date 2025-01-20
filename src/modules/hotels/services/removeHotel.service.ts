import { Inject, Injectable } from '@nestjs/common';
import { HOTEL_REPOSITORY_TOKENS } from '../utils/repositoriesTokens';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';


@Injectable()
export class RemoveHotelsService {
        constructor(
          @Inject(HOTEL_REPOSITORY_TOKENS)
          private readonly hotelRepositories: IHotelRepository,
        ) {}
  remove(id: number) {
    return this.hotelRepositories.deleteHotel(id);
  }
}
