import { Injectable } from '@nestjs/common'
import { AdminExercisesRepo } from './admin-exercises.repo'
import { CreateExerciseDto } from './dtos/create-exercise.dto'
import { Exercise } from 'generated/prisma/client'

@Injectable()
export class AdminExercisesService {
	constructor(private readonly adminExercisesRepo: AdminExercisesRepo) {}

	async create(data: CreateExerciseDto): Promise<Exercise> {
		return await this.adminExercisesRepo.create(data)
	}
}
