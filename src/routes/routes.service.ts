import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Route } from './entities/route.schema';
import { Counter } from './entities/counter.schema';
import { Response } from 'express';
import { Cron, CronExpression } from '@nestjs/schedule';
import urlMetadata from 'url-metadata';
import idToUrl from '../../utils/idToUrl';

@Injectable()
export class RoutesService {
  constructor(
    @InjectModel(Route.name) private routeModel: Model<Route>,
    @InjectModel(Counter.name) private counterModel: Model<Counter>,
  ) {}
  async create(createRouteDto: CreateRouteDto, @Res() res: Response) {
    try {
      const routeAlreadyExists = await this.routeModel.findOne({
        long_url: createRouteDto.long_url,
      });

      if (routeAlreadyExists)
        return res.status(HttpStatus.CONFLICT).json({
          body: routeAlreadyExists,
          message: 'Shortened url : ' + routeAlreadyExists.short_url,
        });
      const isUrlValid = await fetch(createRouteDto.long_url);
      if (!isUrlValid)
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Web page does nos exists',
        });
      const sequenceNumber = await this.counterModel.findOne();
      const route = await this.routeModel.create({
        long_url: createRouteDto.long_url,
        short_url: idToUrl(sequenceNumber.seq_value + 1),
      });

      return res
        .status(HttpStatus.CREATED)
        .json({ body: route, message: 'Shortened url : ' + route.short_url });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error has occoured on posting a route  ->' + error.message,
      });
    }
  }

  async findOne(short_url: string, @Res() res: Response) {
    try {
      const route = await this.routeModel.findOne({ short_url: short_url });
      if (route) {
        await this.routeModel.findByIdAndUpdate(route._id, {
          $inc: { counter: 1 },
        });
        return res.status(HttpStatus.FOUND).json({
          body: route,
          message: 'The original URL is: ' + route.long_url,
        });
      } else {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Shortened Route not registered ' });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error has occoured getting a route ->' + error.message,
      });
    }
  }

  async topRoutes(@Res() res: Response) {
    try {
      const topRoutes = await this.routeModel
        .find()
        .sort({ counter: -1 })
        .limit(100);
      if (topRoutes.length === 0) {
        return res
          .status(HttpStatus.NO_CONTENT)
          .json('No routes were registered yet');
      }
      const treatedTopRoutes = topRoutes.map((route) => ({
        URL: route.long_url,
        'SHORT URL': route.short_url,
        USES: route.counter,
      }));

      return res.status(HttpStatus.FOUND).json(treatedTopRoutes);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:
          'An error has occoured fetching top 100 routes  ->' + error.message,
      });
    }
  }
  @Cron(CronExpression.EVERY_10_SECONDS)
  async fetchAndUpdateTitles() {
    const routes = await this.routeModel.find();
    for (const route of routes) {
      try {
        const webPage = await urlMetadata(route.long_url);
        const title = webPage['title'];
        await this.routeModel.findByIdAndUpdate(route._id, { title: title });
      } catch (error) {
        console.error('Error updating routes titles ' + error);
      }
    }
  }
}
