import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/db/prisma.service'
import { CreateUnitDto } from './dtos/create-unit.dto'
import { Unit } from 'generated/prisma/client'

@Injectable()
export class AdminUnitsRepo {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateUnitDto): Promise<Unit> {
		return await this.prisma.unit.create({
			data,
		})
	}
}
