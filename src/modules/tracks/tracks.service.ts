import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common'
import { TracksRepo } from './tracks.repo'
import { Track } from 'generated/prisma/browser'
import { CreateTrackDto } from './dtos'
import { TrackToReturn, UnitToReturn } from '../courses/types'
import { UserStatesService } from '../user-states/user-states.service'

@Injectable()
export class TracksService {
	constructor(
		private readonly tracksRepo: TracksRepo,
		private readonly userStatesService: UserStatesService,
	) {}

	async create(data: CreateTrackDto) {
		return await this.tracksRepo.create(data)
	}

	async getById(id: string): Promise<Track> {
		const track = await this.tracksRepo.findById(id)

		if (!track) {
			throw new NotFoundException('Track not found')
		}
		return track
	}

	async getMany() {
		const userId = '1'
		const userState = await this.userStatesService.getByUserId(userId)
		if (!userState.currentSectionId) {
			throw new InternalServerErrorException('User is not enrolled in any section')
		}

		const rawTracks = await this.tracksRepo.findMany(userState.currentSectionId)

		const tracksToReturn: TrackToReturn[] = []

		for (let i = 0; i < rawTracks.length; i++) {
			let unitsToReturn: UnitToReturn[] = []

			const trackProgress = rawTracks[i].progresses.find(p => p.userId === userId)

			const isTrackCompleted = trackProgress?.isCompleted || false
			const isTrackAvailable =
				i === 0 ? true : tracksToReturn[i - 1].isCompleted === true

			const trackToReturn: TrackToReturn = {
				id: rawTracks[i].id,
				name: rawTracks[i].name,
				isCompleted: isTrackCompleted,
				isAvailable: isTrackAvailable,
				units: unitsToReturn,
			}

			for (let b = 0; b < rawTracks[i].units.length; b++) {
				const unitProgress = rawTracks[i].units[b].progresses.find(
					u => u.userId === userId,
				)

				const isUnitCompleted = unitProgress?.isCompleted || false
				const isUnitAvailable =
					isTrackAvailable &&
					(b === 0 ? true : unitsToReturn[b - 1].isCompleted === true)

				const unitToReturn: UnitToReturn = {
					id: rawTracks[i].units[b].id,
					name: rawTracks[i].units[b].name || '',
					isCompleted: isUnitCompleted,
					isAvailable: isUnitAvailable,
				}

				unitsToReturn.push(unitToReturn)
			}

			tracksToReturn.push(trackToReturn)
		}

		return tracksToReturn
	}
}
