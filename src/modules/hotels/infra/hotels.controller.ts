import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UploadedFiles, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, UseInterceptors } from '@nestjs/common';

import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { CreateHotelsService } from '../services/createHotel.service';
import { FindAllHotelsService } from '../services/findAllHotel.service';
import { FindOneHotelsService } from '../services/findOneHotel.service';
import { UpdateHotelsService } from '../services/updateHotel.service';
import { RemoveHotelsService } from '../services/removeHotel.service';
import { FindByNameHotelsService } from '../services/findByNameHotel.service';
import { FindByOwnerHotelsService } from '../services/findByOwnerHotel.service';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guards';
import { RoleGuard } from 'src/shared/guards/role.guards';
import { Roles } from 'src/shared/decorators/roles.decorators';
import { Role } from '@prisma/client';
import { OwnerHotelGuard } from 'src/shared/guards/ownerHotel.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { uploadImageHotelService } from '../services/uploadImageHotel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationInterceptor } from 'src/shared/interceptors/fileValidation.interceptor';


@UseGuards(AuthGuard, RoleGuard)
@Controller('hotels')
export class HotelsController {
  constructor(
    private readonly createHotelService: CreateHotelsService,
    private readonly findOneHotelService: FindOneHotelsService,
    private readonly findAllHotelService: FindAllHotelsService,
    private readonly updateHotelService: UpdateHotelsService,
    private readonly removeHotelService: RemoveHotelsService,
    private readonly findByNameService : FindByNameHotelsService,
    private readonly findByOwnerService : FindByOwnerHotelsService ,
    private readonly uploadImageHotelService : uploadImageHotelService
  ) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@User('id') id: number, @Body() createHotelDto: CreateHotelDto) {
    return this.createHotelService.execute(createHotelDto,id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  findAll(@Query('page') page: string = "1", @Query('limit') limit:string="10" ) {
    return this.findAllHotelService.findAll(Number(page),Number(limit));
  }


  @Roles(Role.ADMIN)
  @Get('owner')
  findOwner(@User('id') id: number) {
    return this.findByOwnerService.findByOwner(id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get('name')
  findName(@Query('name') name:string) {
    return this.findByNameService.findByName(name);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.findOneHotelService.findOne(+id);
  }

 @UseInterceptors(FileInterceptor('image'), FileValidationInterceptor) 
@Patch('image/:hotelId')
uploadImage(@Param('hotelId') id:string,
 @UploadedFile(
  new ParseFilePipe({
    validators: [
      new FileTypeValidator({
         fileType: 'image/*'
     }),
     new MaxFileSizeValidator({
         maxSize: 1024 * 1024
     }),
    ],
  })
 ) 
 image: Express.Multer.File,
){ 
  return this.uploadImageHotelService.execute(id,image.filename);
}


  @UseGuards(OwnerHotelGuard)
  @Roles(Role.ADMIN, )
  @Patch(':id')
  update(@ParamId() id: number, @Body() updateHotelDto: UpdateHotelDto) {
    return this.updateHotelService.update(+id, updateHotelDto);
  }

  @UseGuards(OwnerHotelGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@ParamId() id: number) {
    return this.removeHotelService.remove(id);
  }
}
