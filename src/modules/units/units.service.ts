import { Injectable, NotFoundException } from '@nestjs/common'
import { UnitsRepo } from './units.repo'
import { Unit } from 'generated/prisma/client'

@Injectable()
export class UnitsService {
	constructor(private readonly unitsRepo: UnitsRepo) {}

	async getById(id: string): Promise<Unit> {
		const unit: Unit | null = await this.unitsRepo.getById(id)

		if (!unit) {
			throw new NotFoundException('Unit not found')
		}

		return unit
	}
}
