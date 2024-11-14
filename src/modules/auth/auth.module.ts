import {Module} from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user.module';

@Module({
    imports: [
        JwtModule.register({
            secret:process.env.JWT_SECRET
        }),
        PrismaModule,
        UserModule
    ],
    providers: [AuthService],
    exports: [AuthService],
    controllers: [AuthController]
})

export class AuthModule {}