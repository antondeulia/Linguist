import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/db/prisma.service'
import { CreateTrackDto } from './dtos/create-track.dto'
import { Track } from 'generated/prisma/client'

@Injectable()
export class AdminTracksRepo {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateTrackDto): Promise<Track> {
		return await this.prisma.track.create({
			data,
		})
	}
}
