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
import { FindByNameHotelsService } from './services/findByNameHotel.service';
import { FindByOwnerHotelsService } from './services/findByOwnerHotel.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [HotelsController],
  providers: [
    CreateHotelsService,
    FindOneHotelsService,
    FindAllHotelsService,
    UpdateHotelsService,
    CreateHotelsService,
    RemoveHotelsService,
    FindByNameHotelsService,
    FindByOwnerHotelsService,
   {
    provide:HOTEL_REPOSITORY_TOKENS,
    useClass:HotelsRepositories,
   }
  ],
})
export class HotelsModule {}
