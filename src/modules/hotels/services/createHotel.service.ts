import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './domain/dto/create-hotel.dto';


@Injectable()
export class CreateHotelsService {
  execute(createHotelDto: CreateHotelDto) {
    return 'This action adds a new hotel';
  }
  
}
