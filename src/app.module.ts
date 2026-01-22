import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { ExercisesModule } from './modules/exercises/exercises.module'
import { PrismaModule } from './infra/db/prisma.module'
import { AdminUnitsModule } from './modules/admin/admin-units/admin-units.module'
import { AdminTracksModule } from './modules/admin/admin-tracks/admin-tracks.module'
import { AdminCoursesModule } from './modules/admin/admin-courses/admin-courses.module'
import { AdminExercisesModule } from './modules/admin/admin-exercises/admin-exercises.module'
import { ExerciseProgressModule } from './modules/exercise-progress/exercise-progress.module'
import { CoursesModule } from './modules/courses/courses.module';
import { UnitsModule } from './modules/units/units.module';
import { UnitProgressesModule } from './modules/unit-progresses/unit-progresses.module';
import { ExamsModule } from './modules/exams/exams.module';
import { ExamSectionsModule } from './modules/exam-sections/exam-sections.module';
import { ExamSectionProgressesModule } from './modules/exam-section-progresses/exam-section-progresses.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PrismaModule,
		ExercisesModule,
		AdminUnitsModule,
		AdminTracksModule,
		AdminCoursesModule,
		AdminExercisesModule,
		ExerciseProgressModule,
		CoursesModule,
		UnitsModule,
		UnitProgressesModule,
		ExamsModule,
		ExamSectionsModule,
		ExamSectionProgressesModule,
	],
	controllers: [AppController],
})
export class AppModule {}
