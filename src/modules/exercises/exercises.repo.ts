import { Injectable } from '@nestjs/common'
import { Exercise } from 'generated/prisma/client'
import { PrismaService } from 'src/infra/db/prisma.service'

@Injectable()
export class ExercisesRepo {
	constructor(private readonly prisma: PrismaService) {}

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
}
