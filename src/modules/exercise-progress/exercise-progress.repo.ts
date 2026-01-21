import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/db/prisma.service'
import { CompleteExerciseProgressInput, CreateExerciseProgressInput } from './types'
import { ExerciseProgress } from 'generated/prisma/client'

@Injectable()
export class ExerciseProgressRepo {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: string): Promise<ExerciseProgress | null> {
		return await this.prisma.exerciseProgress.findUnique({ where: { id } })
	}

	async create(data: CreateExerciseProgressInput): Promise<ExerciseProgress> {
		return await this.prisma.exerciseProgress.create({
			data,
		})
	}

	async update(
		id: string,
		{ semanticLevel, detectedLevel, explanation }: CompleteExerciseProgressInput,
	): Promise<void> {
		await this.prisma.exerciseProgress.update({
			where: { id },
			data: {
				isCompleted: true,
				semanticLevel,
				detectedLevel,
				explanation: explanation || '',
			},
		})
	}
}
