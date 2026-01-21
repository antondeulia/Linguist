import { Injectable } from '@nestjs/common'
import { UnitProgress } from 'generated/prisma/browser'
import { PrismaService } from 'src/infra/db/prisma.service'
import {
	CreateUnitProgressInput,
	GetOneUnitProgressInput,
	UpdateUnitProgressInput,
} from './types'

@Injectable()
export class UnitProgressesRepo {
	constructor(private readonly prisma: PrismaService) {}

	async getOne({
		unitId,
		userId,
	}: GetOneUnitProgressInput): Promise<UnitProgress | null> {
		return await this.prisma.unitProgress.findFirst({ where: { unitId, userId } })
	}

	async create(data: CreateUnitProgressInput): Promise<UnitProgress> {
		return await this.prisma.unitProgress.create({
			data,
		})
	}

	async update(id: string, data: UpdateUnitProgressInput): Promise<void> {
		await this.prisma.unitProgress.update({
			where: { id },
			data,
		})
	}
}
