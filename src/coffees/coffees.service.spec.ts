import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { DataSource, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

type RepositoryMock<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createRepositoryMock: <T = any>() => RepositoryMock<T> = () => ({
  findOne: jest.fn(),
});

describe('CoffeesService', () => {
  let coffeeRepository: RepositoryMock;
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: getRepositoryToken(Coffee),
          useValue: createRepositoryMock(),
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createRepositoryMock(),
        },
        { provide: DataSource, useValue: {} },
      ],
    }).compile();

    coffeeRepository = module.get<RepositoryMock>(getRepositoryToken(Coffee));
    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('return coffee object', async () => {
        const coffeId = 1;
        const existingCoffee = {};
        coffeeRepository.findOne.mockReturnValue(existingCoffee);

        const result = await service.findOne(coffeId);

        expect(result).toEqual(existingCoffee);
      });
    });
    describe('when coffee with ID does not exists', () => {
      it('throw NotFoundException', async () => {
        const coffeId = 1;
        coffeeRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(coffeId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toBe(`Coffee #${coffeId} not found`);
        }
      });
    });
  });
});
