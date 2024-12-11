import { Module } from '@nestjs/common';
import { HotelsController } from './infra/hotels.controller';
import { CreateHotelsService } from './services/createHotel.service';
import { FindOneHotelsService } from './services/findOneHotel.service';
import { FindAllHotelsService } from './services/findAllHotel.service';
import { UpdateHotelsService } from './services/updateHotel.service';

@Module({
  controllers: [HotelsController],
  providers: [
    CreateHotelsService,
    FindOneHotelsService,
    FindAllHotelsService,
    UpdateHotelsService,
    CreateHotelsService,
  ],
})
export class HotelsModule {}
