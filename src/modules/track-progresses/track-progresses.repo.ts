import { Injectable } from '@nestjs/common'
import { TrackProgress } from 'generated/prisma/browser'
import { PrismaService } from 'src/infra/db/prisma.service'

@Injectable()
export class TrackProgressesRepo {
	constructor(private readonly prisma: PrismaService) {}

	async getOne({
		userId,
		trackId,
	}: {
		userId: string
		trackId: string
	}): Promise<TrackProgress | null> {
		return await this.prisma.trackProgress.findFirst({
			where: {
				userId,
				trackId,
			},
		})
	}

	async create({ userId, trackId, totalUnits }): Promise<TrackProgress> {
		return await this.prisma.trackProgress.create({
			data: {
				userId,
				trackId,
				totalUnits,
			},
		})
	}

	async update(id: string, data: { completedUnits: number; isCompleted?: boolean }) {
		await this.prisma.trackProgress.update({
			where: { id },
			data,
		})

		return true
	}
}
