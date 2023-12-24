import { Controller, Get, Post, Body, Param, Res, Put } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { Response } from 'express';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto, @Res() res: Response) {
    return this.routesService.create(createRouteDto, res);
  }

  @Get(':short_url')
  findOne(@Param('short_url') short_url: string, @Res() res: Response) {
    return this.routesService.findOne(short_url, res);
  }
  @Get()
  topRoutes(@Res() res: Response) {
    return this.routesService.topRoutes(res);
  }
}
