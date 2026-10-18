import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { WelcomeService } from './welcome.service.js';
import { WelcomeController } from './welcome.controller.js'; 
import { CoursesModule } from './courses/courses.module.js';
import { MatriculaModule } from './matricula/matricula.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module.js';
import Joi from 'joi';
export const { ObserveModule, ObserveInstrument } = createObserveModule();
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true,validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
        PORT: Joi.number().port().default(3000),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().port().default(5432),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().allow('').required(),}),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres', 
        host: config.getOrThrow<string>('DATABASE_HOST'),
        port: Number(config.getOrThrow<number>('DATABASE_PORT')),
        username: config.getOrThrow<string>('DATABASE_USER'),
        password: config.getOrThrow<string>('DATABASE_PASSWORD'),
        database: config.getOrThrow<string>('DATABASE_NAME'),
        autoLoadEntities: true, 
        synchronize: config.getOrThrow<string>('NODE_ENV') === 'development',
      }),
    }),
    CoursesModule,
    StudentsModule,
    MatriculaModule,
  ],
  controllers: [AppController, WelcomeController],
  providers: [AppService, WelcomeService],
})
export class AppModule {}
