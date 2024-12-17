import { Module } from '@nestjs/common';
import { HotelsController } from './infra/hotels.controller';
import { CreateHotelsService } from './services/createHotel.service';
import { FindOneHotelsService } from './services/findOneHotel.service';
import { FindAllHotelsService } from './services/findAllHotel.service';
import { UpdateHotelsService } from './services/updateHotel.service';
import { HotelsRepositories } from './infra/hotels.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { RemoveHotelsService } from './services/removeHotel.service';
import { HOTEL_REPOSITORY_TOKENS } from './utils/repositoriesTokens';

@Module({
  imports: [PrismaModule],
  controllers: [HotelsController],
  providers: [
    CreateHotelsService,
    FindOneHotelsService,
    FindAllHotelsService,
    UpdateHotelsService,
    CreateHotelsService,
    RemoveHotelsService,
   {
    provide:HOTEL_REPOSITORY_TOKENS,
    useClass:HotelsRepositories,
   }
  ],
})
export class HotelsModule {}
