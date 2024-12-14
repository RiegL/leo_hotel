import { Injectable } from '@nestjs/common';

import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';

@Injectable()
export class UpdateHotelsService {

  update(id: number, UpdateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

}
