import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/db/prisma.service'
import { CreateSegmentDto } from './dtos'

@Injectable()
export class SegmentsRepo {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateSegmentDto) {
		return await this.prisma.textSegment.create({
			data,
		})
	}
}
