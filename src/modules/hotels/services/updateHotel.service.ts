import { Injectable } from '@nestjs/common';

import { UpdateHotelDTO } from './domain/dto/update-hotel.dto';

@Injectable()
export class UpdateHotelsService {

  update(id: number, UpdateHotelDTO: UpdateHotelDTO) {
    return `This action updates a #${id} hotel`;
  }

}
