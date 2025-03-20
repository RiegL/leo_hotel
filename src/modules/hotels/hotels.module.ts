import { Module } from '@nestjs/common';
import { HotelsController } from './infra/hotels.controller';
import { CreateHotelsService } from './services/createHotel.service';
import { FindOneHotelsService } from './services/findOneHotel.service';
import { FindAllHotelsService } from './services/findAllHotel.service';
import { UpdateHotelsService } from './services/updateHotel.service';
import { HotelsRepositories } from './infra/hotels.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { RemoveHotelsService } from './services/removeHotel.service';
import { REPOSITORY_TOKEN_HOTEL } from './utils/repositoriesTokens';
import { FindByNameHotelsService } from './services/findByNameHotel.service';
import { FindByOwnerHotelsService } from './services/findByOwnerHotel.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { uploadImageHotelService } from './services/uploadImageHotel.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads-hotel',
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}-${file.originalname}`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [HotelsController],
  providers: [
    CreateHotelsService,
    FindOneHotelsService,
    FindAllHotelsService,
    UpdateHotelsService,
    RemoveHotelsService,
    FindByNameHotelsService,
    FindByOwnerHotelsService,
    uploadImageHotelService,
    {
      provide: REPOSITORY_TOKEN_HOTEL,
      useClass: HotelsRepositories,
    },
  ],
})
export class HotelsModule {}
