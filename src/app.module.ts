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
export const { ObserveModule, ObserveInstrument } = createObserveModule();
@Module({
  imports: [CoursesModule, MatriculaModule],
  controllers: [AppController, WelcomeController,MatriculaController],
  providers: [AppService, WelcomeService,MatriculaService],
})
export class AppModule {}