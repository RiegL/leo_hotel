// reservations.repository.ts
import { Injectable } from '@nestjs/common';
import { IReservationRepository } from '../domain/repositories/Ireservations.repository';
import { Reservation } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReservationsRepositories implements IReservationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any): Promise<Reservation> {
    return this.prisma.reservation.create({ data });
  }

  async findById(id: number): Promise<Reservation | null> {
    return this.prisma.reservation.findUnique({ where: { id } });
  }

  async findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }

  async findByUser(userId: number): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({ where: { userId } });
  }
}
