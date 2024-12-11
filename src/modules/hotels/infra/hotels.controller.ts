import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateHotelDTO } from '../domain/dto/create-hotel.dto';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { CreateHotelsService } from '../services/createHotel.service';
import { FindAllHotelsService } from '../services/findAllHotel.service';
import { FindOneHotelsService } from '../services/findOneHotel.service';
import { UpdateHotelsService } from '../services/updateHotel.service';
import { RemoveHotelsService } from '../services/removeHotel.service';

@Controller('hotels')
export class HotelsController {
  constructor(
    private readonly createHotelsService: CreateHotelsService,
    private readonly findAllHotelsService: FindAllHotelsService,
    private readonly findOneHotelsService: FindOneHotelsService,
    private readonly updateHotelsService: UpdateHotelsService,
    private readonly removeHotelsService: RemoveHotelsService,
  ) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDTO) {
    return this.createHotelsService.execute(createHotelDto);
  }

  @Get()
  findAll() {
    return this.findAllHotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneHotelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.updateHotelsService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeHotelsService.remove(+id);
  }
}
