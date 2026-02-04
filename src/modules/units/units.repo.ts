import { Injectable } from '@nestjs/common'
import { Unit } from 'generated/prisma/browser'
import { PrismaService } from 'src/infra/db/prisma.service'
import { CreateTrackDto } from '../tracks/dtos'
import { CreateUnitDto } from './dtos'

@Injectable()
export class UnitsRepo {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateUnitDto) {
		return await this.prisma.unit.create({
			data,
		})
	}

	async getById(id: string): Promise<Unit | null> {
		return await this.prisma.unit.findUnique({
			where: { id },
			include: {
				exercises: {
					include: {
						segments: true,
					},
				},
			},
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
