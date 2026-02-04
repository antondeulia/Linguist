import { Injectable } from '@nestjs/common'
import { Exercise } from 'generated/prisma/client'
import { PrismaService } from 'src/infra/db/prisma.service'
import { CreateExerciseDto } from './dtos'

@Injectable()
export class ExercisesRepo {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateExerciseDto) {
		return await this.prisma.exercise.create({
			data: {
				rawText: data.rawText,
				direction: data.direction,
				type: data.type,
				sourceLang: 'ru',
				targetLang: 'en',
				unitId: data.unitId,
			},
		})
	}

	async getMany(unitId: string) {
		return await this.prisma.exercise.findMany({
			where: {
				unitId,
			},
		})
	}

	async getById(id: string): Promise<Exercise | null> {
		return await this.prisma.exercise.findUnique({
			where: { id },
		})
	}

	async getCountByUnit(unitId: string): Promise<number> {
		return await this.prisma.exercise.count({
			where: {
				unitId,
			},
		})
	}
}
