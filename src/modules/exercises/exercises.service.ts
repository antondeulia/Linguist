import { Injectable } from '@nestjs/common'
import { ExercisesRepo } from './exercises.repo'

@Injectable()
export class ExercisesService {
	constructor(private readonly exercisesRepo: ExercisesRepo) {}

	async getMany() {
		return await this.exercisesRepo.getMany()
	}
}
