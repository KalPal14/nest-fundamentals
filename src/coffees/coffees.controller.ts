import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from '../common/decorators/public/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int/parse-int.pipe';
import { Protocol } from '../common/decorators/protocol/protocol.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesServise: CoffeesService) {}

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Public()
  @Get()
  findAll(
    @Protocol('https') protocol: string,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    console.log(protocol);
    return this.coffeesServise.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coffeesServise.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesServise.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesServise.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeesServise.remove(id);
  }
}
