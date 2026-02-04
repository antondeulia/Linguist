import { Injectable } from '@nestjs/common'
import { Track } from 'generated/prisma/browser'
import { PrismaService } from 'src/infra/db/prisma.service'
import { CreateTrackDto } from './dtos'

@Injectable()
export class TracksRepo {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateTrackDto) {
		return await this.prisma.track.create({
			data,
		})
	}

	async findById(id: string): Promise<Track | null> {
		return await this.prisma.track.findUnique({
			where: { id },
			include: {
				_count: {
					select: {
						units: true,
					},
				},
				units: {
					include: {
						_count: {
							select: {
								exercises: true,
							},
						},
					},
				},
			},
		})
	}

	async findMany(sectionId: string) {
		return await this.prisma.track.findMany({
			where: {
				sectionId,
			},
			include: {
				progresses: true,
				units: {
					include: {
						progresses: true,
					},
				},
			},
		})
	}
}
