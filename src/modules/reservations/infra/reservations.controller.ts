import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
// import { UpdateReservationDto } from '../domain/dto/update-reservation.dto';

import { User } from 'src/shared/decorators/user.decorator';
import { FindByIdReservationsService } from '../services/findByIdReservations.service';
import { FindAllReservationsService } from '../services/findAllReservations.service';
import { CreateReservationsService } from '../services/createReservations.service';
import { FindByUserReservationsService } from '../services/findByUserReservations.service';
import { UpdateStatusReservationsService } from '../services/updateStatusReservations.service';
import { AuthGuard } from 'src/shared/guards/auth.guards';
import { ReservationStatus, Role } from '@prisma/client';
import { Roles } from 'src/shared/decorators/roles.decorators';
import { ParamId } from 'src/shared/decorators/paramId.decorator';

@UseGuards(AuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly createReservationsService: CreateReservationsService,
    private readonly findAllReservationsService: FindAllReservationsService,
    private readonly findByIdReservationsService: FindByIdReservationsService,
    private readonly findByUserReservationsService: FindByUserReservationsService,
    private readonly updateStatusReservationsService: UpdateStatusReservationsService,
  ) {}
  @Roles(Role.USER)
  @Post()
  create(@User('id') id: number, @Body() body: CreateReservationDto) {
    return this.createReservationsService.execute(id, body);
  }

  @Get()
  findAll() {
    return this.findAllReservationsService.execute();
  }

  @Get('user')
  findByUser(@User('id') id: number) {
    return this.findByUserReservationsService.execute(id);
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.findByIdReservationsService.execute(id);
  }
  @Roles(Role.ADMIN)
  @Patch(':id/status')
  updateStatus(
    @ParamId() id:number,
    @Body('status') status: ReservationStatus,
  ) {
    return this.updateStatusReservationsService.execute(id,status);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reservationsService.remove(+id);
  // }
}
