import { Module } from '@nestjs/common'
import { AdminExercisesService } from './admin-exercises.service'
import { AdminExercisesController } from './admin-exercises.controller'
import { AdminExercisesRepo } from './admin-exercises.repo'

@Module({
	controllers: [AdminExercisesController],
	providers: [AdminExercisesService, AdminExercisesRepo],
})
export class AdminExercisesModule {}
