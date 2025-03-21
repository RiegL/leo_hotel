import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKEN_RESERVATION } from "../utils/repositoriesTokens";
import { IReservationRepository } from "../domain/repositories/Ireservations.repository";



@Injectable()
export class FindAllReservationsService{
constructor(
    @Inject(REPOSITORY_TOKEN_RESERVATION)
    private readonly reservationRepository: IReservationRepository,
) { }

    async execute(page:number=1,limit:number=10) {

        // const offSet = (page -1) * limit
        // const data = await this.reservationRepository.findAll(offSet,limit);
        // const total = await this.reservationRepository.countReservations()

        // return{
        //     total,
        //     page,
        //     per_page:limit,
        //     data
        // }


        return await this.reservationRepository.findAll();
    }


}