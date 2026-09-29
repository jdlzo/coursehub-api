import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { WelcomeService } from './welcome.service.js';
import { WelcomeController } from './welcome.controller.js'; 
import { CoursesModule } from './courses/courses.module.js';
import { MatriculaModule } from './matricula/matricula.module.js';
import { MatriculaController } from './matricula/matricula.controller.js';
import { MatriculaService } from './matricula/matricula.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
export const { ObserveModule, ObserveInstrument } = createObserveModule();
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres', host: config.getOrThrow('DATABASE_HOST'),
        port: Number(config.getOrThrow('DATABASE_PORT')),
        username: config.getOrThrow('DATABASE_USER'),
        password: config.getOrThrow('DATABASE_PASSWORD'),
        database: config.getOrThrow('DATABASE_NAME'),
        autoLoadEntities: true, synchronize: true,
      }),
    }),
    CoursesModule
  ],
  controllers: [AppController, WelcomeController,/*MatriculaController*/],
  providers: [AppService, WelcomeService,/*MatriculaService*/],
})
export class AppModule {}

