import { Module } from '@nestjs/common'
import { ExercisesService } from './exercises.service'
import { ExercisesController } from './exercises.controller'
import { ExercisesRepo } from './exercises.repo'

@Module({
	controllers: [ExercisesController],
	providers: [ExercisesService, ExercisesRepo],
})
export class ExercisesModule {}
