import { Injectable } from '@nestjs/common'
import { TrackProgressesRepo } from './track-progresses.repo'
import { TrackProgress } from 'generated/prisma/browser'
import { UnitsRepo } from '../units/units.repo'

@Injectable()
export class TrackProgressesService {
	constructor(
		private readonly trackProgressesRepo: TrackProgressesRepo,
		private readonly unitsRepo: UnitsRepo,
	) {}

	async unitCompleted({ userId, trackId }: { userId: string; trackId: string }) {
		const progress: TrackProgress = await this.getOneOrCreate({
			userId,
			trackId,
		})

		const completedUnits = progress.completedUnits + 1

		const isLastUnit = completedUnits === progress.totalUnits

		if (isLastUnit) {
			await this.trackProgressesRepo.update(progress.id, {
				completedUnits,
				isCompleted: true,
			})
		} else {
			await this.trackProgressesRepo.update(progress.id, { completedUnits })
		}
	}

	// Private methods
	private async getOneOrCreate({
		userId,
		trackId,
	}: {
		userId: string
		trackId: string
	}): Promise<TrackProgress> {
		let progress: TrackProgress | null = await this.trackProgressesRepo.getOne({
			userId,
			trackId,
		})

		if (!progress) {
			const totalUnits = await this.unitsRepo.getCountByTrackId(trackId)

			progress = await this.trackProgressesRepo.create({
				userId,
				trackId,
				totalUnits,
			})
		}
		return progress
	}
}
