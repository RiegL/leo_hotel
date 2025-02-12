import { Injectable } from "@nestjs/common";
import { IReservationRepository } from "../domain/repositories/Ireservations.repository";
import { Reservation } from "@prisma/client";
import { CreateReservationDto } from "../domain/dto/create-reservation.dto";
import { PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
export class ReservationRepository implements IReservationRepository{
    constructor(private readonly prisma: PrismaService) {}
    create( data: any): Promise<Reservation> {
       return this.prisma.reservation.create({data})
    }

}