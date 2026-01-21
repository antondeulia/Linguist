import { Injectable } from '@nestjs/common'
import { AdminUnitsRepo } from './admin-units.repo'
import { CreateUnitDto } from './dtos/create-unit.dto'
import { Unit } from 'generated/prisma/client'

@Injectable()
export class AdminUnitsService {
	constructor(private readonly adminUnitsRepo: AdminUnitsRepo) {}

	async create(data: CreateUnitDto): Promise<Unit> {
		return await this.adminUnitsRepo.create(data)
	}
}
