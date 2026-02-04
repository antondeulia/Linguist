import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { ExercisesModule } from './modules/exercises/exercises.module'
import { PrismaModule } from './infra/db/prisma.module'
import { ExerciseProgressModule } from './modules/exercise-progress/exercise-progress.module'
import { CoursesModule } from './modules/courses/courses.module'
import { UnitsModule } from './modules/units/units.module'
import { UnitProgressesModule } from './modules/unit-progresses/unit-progresses.module'
import { TrackProgressesModule } from './modules/track-progresses/track-progresses.module'
import { TracksModule } from './modules/tracks/tracks.module'
import { SegmentsModule } from './modules/segments/segments.module';
import { SectionsModule } from './modules/sections/sections.module';
import { SectionProgressesModule } from './modules/section-progresses/section-progresses.module';
import { UserStatesModule } from './modules/user-states/user-states.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PrismaModule,
		ExercisesModule,
		ExerciseProgressModule,
		CoursesModule,
		UnitsModule,
		UnitProgressesModule,
		TrackProgressesModule,
		TracksModule,
		SegmentsModule,
		SectionsModule,
		SectionProgressesModule,
		UserStatesModule,
	],
	controllers: [AppController],
})
export class AppModule {}
