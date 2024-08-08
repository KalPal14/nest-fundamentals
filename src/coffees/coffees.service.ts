import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offcet } = paginationQueryDto;
    return await this.coffeeRepository.find({
      skip: offcet,
      take: limit,
      relations: { flavors: true },
    });
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: { flavors: true },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavor(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return await this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = await Promise.all(
      (updateCoffeeDto.flavors ?? []).map((name) => this.preloadFlavor(name)),
    );

    const coffeIndex = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffeIndex) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    const { flavors: _, ...coffeWithoutFlavors } = coffeIndex;
    return await this.coffeeRepository.save(
      updateCoffeeDto.flavors ? coffeIndex : coffeWithoutFlavors,
    );
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return await this.coffeeRepository.remove(coffee);
  }

  async preloadFlavor(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
