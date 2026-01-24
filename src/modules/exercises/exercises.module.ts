import { Module } from '@nestjs/common'
import { ExercisesService } from './exercises.service'
import { ExercisesController } from './exercises.controller'
import { ExercisesRepo } from './exercises.repo'
import { ExerciseProgressModule } from '../exercise-progress/exercise-progress.module'
import { TrackProgressesModule } from '../track-progresses/track-progresses.module'
import { UnitProgressesModule } from '../unit-progresses/unit-progresses.module'

@Module({
	imports: [ExerciseProgressModule, TrackProgressesModule, UnitProgressesModule],
	controllers: [ExercisesController],
	providers: [ExercisesService, ExercisesRepo],
	exports: [ExercisesRepo],
})
export class ExercisesModule {}
