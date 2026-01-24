import { Injectable } from '@nestjs/common'
import { Unit } from 'generated/prisma/browser'
import { PrismaService } from 'src/infra/db/prisma.service'

@Injectable()
export class UnitsRepo {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: string): Promise<Unit | null> {
		return await this.prisma.unit.findUnique({
			where: { id },
			include: { exercises: true },
		})
	}

	async getExercisesCount(unitId: string) {
		return await this.prisma.exercise.count({
			where: {
				unitId,
			},
		})
	}

	async getCountByTrackId(trackId: string): Promise<number> {
		return await this.prisma.unit.count({
			where: {
				trackId,
			},
		})
	}
}
