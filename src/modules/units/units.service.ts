import { Injectable, NotFoundException } from '@nestjs/common'
import { UnitsRepo } from './units.repo'
import { Unit } from 'generated/prisma/client'
import { CreateUnitDto } from './dtos'
import { UserStatesService } from '../user-states/user-states.service'

@Injectable()
export class UnitsService {
	constructor(
		private readonly unitsRepo: UnitsRepo,
		private readonly userStatesService: UserStatesService,
	) {}

	async create(data: CreateUnitDto) {
		return await this.unitsRepo.create(data)
	}

	async getCurrent(userId: string): Promise<Unit> {
		const currentUnitId = await this.userStatesService.getCurrentUnitId(userId)

		const unit: Unit | null = await this.unitsRepo.getById(currentUnitId)

		if (!unit) {
			throw new NotFoundException('Unit not found')
		}

		return unit
	}

	async getById(id: string) {
		const unit = await this.unitsRepo.getById(id)

		if (!unit) {
			throw new NotFoundException('Unit not found')
		}

		return unit
	}
}
