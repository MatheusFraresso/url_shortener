import { Test, TestingModule } from '@nestjs/testing';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { Route } from './entities/route.schema';
import { Counter } from './entities/counter.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('RouteController', () => {
  let controller: RoutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutesController],
      providers: [
        RoutesService,
        { provide: getModelToken(Route.name), useValue: jest.fn() },
        { provide: getModelToken(Counter.name), useValue: jest.fn() },
      ],
    }).compile();

    controller = module.get<RoutesController>(RoutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
