import { Injectable, NotFoundException } from '@nestjs/common'
import { Unit, UnitProgress } from 'generated/prisma/browser'
import { UnitProgressesRepo } from './unit-progresses.repo'
import { UnitsRepo } from '../units/units.repo'
import { TrackProgressesService } from '../track-progresses/track-progresses.service'

@Injectable()
export class UnitProgressesService {
	constructor(
		private readonly unitProgressesRepo: UnitProgressesRepo,
		private readonly unitsRepo: UnitsRepo,
		private readonly trackProgressesService: TrackProgressesService,
	) {}

	async exerciseCompleted({ unitId, userId }): Promise<void> {
		const unit = await this.unitsRepo.getById(unitId)

		if (!unit) {
			throw new NotFoundException('Unit not found')
		}

		const unitProgress: UnitProgress = await this.getOneOrCreate({
			unitId,
			userId,
		})

		// Check either the exercise is the last in the unit
		const isLastExercise =
			unitProgress.completedExercises + 1 === unitProgress.totalExercises

		if (!isLastExercise) {
			await this.unitProgressesRepo.update(unitProgress.id, {
				completedExercises: unitProgress.completedExercises + 1,
			})

			return
		}

		// Update unit progress (set isCompleted = true)
		await this.unitProgressesRepo.update(unitProgress.id, {
			completedExercises: unitProgress.completedExercises + 1,
			isCompleted: true,
		})

		// Update track progress (mark completed unit)
		await this.trackProgressesService.unitCompleted({
			trackId: unit.trackId,
			userId,
		})
	}

	// Private methods
	async getOneOrCreate({ unitId, userId }: { unitId: string; userId: string }) {
		let unitProgress: UnitProgress | null = await this.unitProgressesRepo.getOne({
			unitId,
			userId,
		})

		if (!unitProgress) {
			const totalExercises = await this.unitsRepo.getExercisesCount(unitId)

			unitProgress = await this.unitProgressesRepo.create({
				unitId,
				userId,
				totalExercises,
				completedExercises: 0,
			})
		}

		return unitProgress
	}
}
