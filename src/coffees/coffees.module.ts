import { Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS } from './cofees.constants';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from 'src/config/coffees.config';

class CacheManager {}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: async () => {
        // имитируем подключение к чему-то асинхронному
        const result = await Promise.resolve(['lviv cava', 'nescafe']);
        console.log('connected to something');
        return result;
      },
    },
    {
      provide: 'CACHE_MANAGER',
      useClass: CacheManager,
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
