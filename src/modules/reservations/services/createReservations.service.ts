import { Injectable, Inject, forwardRef, BadRequestException } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { REPOSITORY_TOKEN_RESERVATION } from '../utils/repositoriesTokens';
import { IReservationRepository } from '../domain/repositories/Ireservations.repository';
import {differenceInDays, parseISO} from 'date-fns';
import { IHotelRepository } from 'src/modules/hotels/domain/repositories/Ihotel.repositories';
import { Reservation, ReservationStatus } from '@prisma/client';
import { REPOSITORY_TOKEN_HOTEL } from '../../hotels/utils/repositoriesTokens';

@Injectable()
export class CreateReservationsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_RESERVATION)
    private readonly reservationRepository: IReservationRepository,
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepository: IHotelRepository
  ) {}

  async execute(id: number ,data: CreateReservationDto) {
    const checkInDate = parseISO(data.checkIn);
    const checkOutDate = parseISO(data.checkOut);
    const dayOfStay  = differenceInDays(checkInDate,checkOutDate);
 
    if(checkInDate >= checkOutDate){
      throw new BadRequestException('Check-in date must be before check-out date');
    }
    
    const hotel = await this.hotelRepository.findHotelById(data.hotelId);
 
    if(!hotel){
      throw new BadRequestException('Hotel not found');
    }
 
    if(typeof hotel.price !== 'number' || hotel.price <= 0){
      throw new BadRequestException('Invalid hotel price');
   }

   const total = dayOfStay * hotel.price;

   const newReservation = {
    checkIn: checkInDate.toISOString(),
    checkOut: checkOutDate.toISOString(),
    total: total,
    userId: id,
    hotelId: data.hotelId,
    status: ReservationStatus.PENDING
    };
    
    return this.reservationRepository.create(newReservation);
  }

}

