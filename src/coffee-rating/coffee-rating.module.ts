import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { DatabaseModule } from '../database/database.module';
import { CoffeesModule } from '../coffees/coffees.module';

@Module({
  imports: [
    CoffeesModule,
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
    }),
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
