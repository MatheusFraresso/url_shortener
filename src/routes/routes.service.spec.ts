import { Test, TestingModule } from '@nestjs/testing';
import { RoutesService } from './routes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Route } from './entities/route.schema';
import { Counter } from './entities/counter.schema';

describe('RoutesService', () => {
  let service: RoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoutesService,
        { provide: getModelToken(Route.name), useValue: jest.fn() },
        { provide: getModelToken(Counter.name), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<RoutesService>(RoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
