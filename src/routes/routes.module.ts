import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Route, RouteSchema } from './entities/route.schema';
import { Counter, CounterSchema } from './entities/counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Route.name, schema: RouteSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
