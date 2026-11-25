import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import { HttpErrorFilter } from './common/filters/http-error.filter.js';
import { TimingInterceptor } from './common/interceptors/timing.interceptor.js';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,});
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  const config = app.get(ConfigService);
  const port = config.getOrThrow<number>('PORT');
  app.enableCors({
    origin: ['https://coursehub.example.edu'], 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalFilters(new HttpErrorFilter());

  app.useGlobalInterceptors(new TimingInterceptor());

  await app.listen(port);
}
await bootstrap();
