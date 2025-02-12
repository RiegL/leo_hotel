import { ReservationStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  @IsNotEmpty()
  hotelId: number;

  @IsString()
  @IsNotEmpty()
  checkIn: String;

  @IsString()
  @IsNotEmpty()
  checkOut: String;

  @IsEnum(ReservationStatus)
  @IsOptional()
  @Transform(value => value ?? ReservationStatus.PENDING)
  status : ReservationStatus
}
