import { Module } from '@nestjs/common'
import { ExerciseProgressService } from './exercise-progress.service'
import { ExerciseProgressRepo } from './exercise-progress.repo'

@Module({
	providers: [ExerciseProgressService, ExerciseProgressRepo],
	exports: [ExerciseProgressRepo],
})
export class ExerciseProgressModule {}
