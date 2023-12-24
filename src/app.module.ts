import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { RoutesModule } from './routes/routes.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://matheusmfraresso:Lj8fAcrpThi5MhVc@bluecodingtest.8b49bjb.mongodb.net/bluecodingtest_db',
    ),
    RoutesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
