import { Module } from '@nestjs/common';
import { ReservationsController } from './infra/reservations.controller';
import { CreateReservationsService } from './services/createReservations.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { HotelsModule } from '../hotels/hotels.module';
import { REPOSITORY_TOKEN_RESERVATION } from './utils/repositoriesTokens';
import { REPOSITORY_TOKEN_HOTEL } from '../hotels/utils/repositoriesTokens';
import { FindByUserReservationsService } from './services/findByUserReservations.service';
import { FindByIdReservationsService } from './services/findByIdReservations.service';

import { ReservationsRepositories } from './infra/reservations.repository';
import { HotelsRepositories } from '../hotels/infra/hotels.repository';
import { FindAllReservationsService } from './services/findAllReservations.service';
import { UpdateStatusReservationsService } from './services/updateStatusReservations.service';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, HotelsModule],
  controllers: [ReservationsController],
  providers: [
    CreateReservationsService,
    FindAllReservationsService,
    FindByIdReservationsService,
    FindByUserReservationsService,
    UpdateStatusReservationsService,
    {
      provide: REPOSITORY_TOKEN_RESERVATION,
      useClass: ReservationsRepositories,
    },
    {
      provide: REPOSITORY_TOKEN_HOTEL,
      useClass: HotelsRepositories,
    },
  ],
})
export class ReservationsModule {}
