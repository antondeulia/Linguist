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

	async getExercisesCount(id: string): Promise<number> {
		const unit = await this.prisma.unit.findUnique({
			where: { id },
			select: {
				_count: {
					select: { exercises: true },
				},
			},
		})

		return unit?._count.exercises ?? 0
	}
}
