import { Module } from '@nestjs/common'
import { ExercisesService } from './exercises.service'
import { ExercisesController } from './exercises.controller'
import { ExercisesRepo } from './exercises.repo'
import { ExerciseProgressModule } from '../exercise-progress/exercise-progress.module'
import { UnitProgressesModule } from '../unit-progresses/unit-progresses.module'
import { UnitsModule } from '../units/units.module'

@Module({
	imports: [ExerciseProgressModule, UnitProgressesModule, UnitsModule],
	controllers: [ExercisesController],
	providers: [ExercisesService, ExercisesRepo],
})
export class ExercisesModule {}
