import { Injectable } from '@nestjs/common'
import { Exercise } from 'generated/prisma/client'
import { PrismaService } from 'src/infra/db/prisma.service'
import { CreateExerciseDto } from './dtos/create-exercise.dto'

@Injectable()
export class AdminExercisesRepo {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateExerciseDto): Promise<Exercise> {
		return await this.prisma.exercise.create({
			data,
		})
	}
}
