import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Kozak Latte',
      brand: 'Lviv kava',
      flavors: ['salo', 'gorilka'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: number) {
    const coffee = this.coffees.find((coffee) => coffee.id == id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  }

  update(id: number, updateCoffeeDto: any) {
    const coffeIndex = this.coffees.findIndex((coffee) => coffee.id == id);
    if (coffeIndex >= 0) {
      this.coffees[coffeIndex] = {
        ...this.coffees[coffeIndex],
        ...updateCoffeeDto,
      };
      return updateCoffeeDto;
    }
  }

  remove(id: number) {
    const coffeIndex = this.coffees.findIndex((coffee) => coffee.id == id);
    if (coffeIndex >= 0) {
      this.coffees.splice(coffeIndex, 1);
    }
  }
}
