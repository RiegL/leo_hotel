import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';

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
import { AuthGuard } from 'src/shared/guards/auth.guards';
import { RoleGuard } from 'src/shared/guards/role.guards';
import { Roles } from 'src/shared/decorators/roles.decorators';
import { Role } from '@prisma/client';
import { OwnerHotelGuard } from 'src/shared/guards/ownerHotel.guard';


@UseGuards(AuthGuard, RoleGuard)
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

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.createHotelService.execute(createHotelDto);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  findAll() {
    return this.findAllHotelService.findAll();
  }


  @Roles(Role.ADMIN)
  @Get(':ownerId')
  findOwner(@Param('ownerId') ownerId:string) {
    return this.findByOwnerService.findByOwner(ownerId);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get('name')
  findName(@Query('name') name:string) {
    return this.findByNameService.findByName(name);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.findOneHotelService.findOne(+id);
  }

  @UseGuards(OwnerHotelGuard)
  @Roles(Role.ADMIN, )
  @Patch(':id')
  update(@ParamId() id: number, @Body() updateHotelDto: UpdateHotelDto) {
    return this.updateHotelService.update(+id, updateHotelDto);
  }

  @UseGuards(OwnerHotelGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@ParamId() id: number) {
    return this.removeHotelService.remove(+id);
  }
}
