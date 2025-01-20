import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { CreateHotelsService } from '../services/createHotel.service';
import { FindAllHotelsService } from '../services/findAllHotel.service';
import { FindOneHotelsService } from '../services/findOneHotel.service';
import { UpdateHotelsService } from '../services/updateHotel.service';
import { RemoveHotelsService } from '../services/removeHotel.service';
import { FindByNameHotelsService } from '../services/findByNameHotel.service';
import { FindByOwnerHotelsService } from '../services/findByOwnerHotel.service';
import { ParamId } from 'src/shared/decorators/paramId.decorator';

@Controller('hotels')
export class HotelsController {
  constructor(
    private readonly createHotelService: CreateHotelsService,
    private readonly findOneHotelService: FindOneHotelsService,
    private readonly findAllHotelService: FindAllHotelsService,
    private readonly updateHotelService: UpdateHotelsService,
    private readonly removeHotelService: RemoveHotelsService,
    private readonly findByNameService : FindByNameHotelsService,
    private readonly findByOwnerService : FindByOwnerHotelsService 
  ) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.createHotelService.execute(createHotelDto);
  }

  @Get()
  findAll() {
    return this.findAllHotelService.findAll();
  }

  @Get(':ownerId')
  findOwner(@ParamId('') id:number) {
    return this.findByOwnerService.findByOwner(id);
  }

  @Get('name')
  findName(@Query('name') name:string) {
    return this.findByNameService.findByName(name);
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.findOneHotelService.findOne(+id);
  }

  @Patch(':id')
  update(@ParamId() id: number, @Body() updateHotelDto: UpdateHotelDto) {
    return this.updateHotelService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@ParamId() id: number) {
    return this.removeHotelService.remove(+id);
  }
}
