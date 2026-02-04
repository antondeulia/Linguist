import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { SectionsRepo } from './sections.repo'
import { CreateSectionDto } from './dtos'
import { Prisma, Section, SectionProgress } from 'generated/prisma/browser'
import { SectionProgressesService } from '../section-progresses/section-progresses.service'
import { SectionView } from 'src/core/views/section.view'
import { TrackToReturn, UnitToReturn } from '../courses/types'
import { UserStatesService } from '../user-states/user-states.service'

@Injectable()
export class SectionsService {
	constructor(
		private readonly sectionsRepo: SectionsRepo,
		private readonly sectionProgressesService: SectionProgressesService,
		private readonly userStatesService: UserStatesService,
	) {}

	async create(data: CreateSectionDto): Promise<Section> {
		return await this.sectionsRepo.create(data)
	}

	async getMany(data: { userId: string }): Promise<SectionView[]> {
		const { userId } = data

		const userState = await this.userStatesService.getByUserId(userId)

		if (!userState.currentCourseId) {
			throw new BadRequestException('User does not have an active course')
		}

		const sections = await this.sectionsRepo.findMany(userState.currentCourseId)
		const progresses = await this.sectionProgressesService.getMany(
			userId,
			userState.currentCourseId,
		)

		const progressMap = new Map(
			progresses.map((p: SectionProgress) => [p.sectionId, p]),
		)

		let activeFound = false

		return sections.map(section => {
			const progress: SectionProgress = progressMap.get(
				section.id,
			) as SectionProgress

			const isCompleted = progress?.isCompleted

			if (isCompleted) {
				return {
					id: section.id,
					name: section.name,
					variant: 'completed',
					isCompleted: true,
					isAccessible: true,
				}
			}

			if (!activeFound) {
				activeFound = true
				return {
					id: section.id,
					name: section.name,
					variant: 'active',
					isCompleted: false,
					isAccessible: true,
				}
			}

			return {
				id: section.id,
				name: section.name,
				variant: 'locked',
				isCompleted: false,
				isAccessible: false,
			}
		})
	}

	async getById(id: string) {
		const section: SectionWithRelations | null = await this.sectionsRepo.findById(id)

		if (!section) {
			throw new NotFoundException('Section not found')
		}

		const userId = '1'

		const tracksToReturn: TrackToReturn[] = []

		for (let i = 0; i < section.tracks.length; i++) {
			let unitsToReturn: UnitToReturn[] = []

			const trackProgress = section.tracks[i].progresses.find(
				p => p.userId === userId,
			)

			const isTrackCompleted = trackProgress?.isCompleted || false
			const isTrackAvailable =
				i === 0 ? true : tracksToReturn[i - 1].isCompleted === true

			const trackToReturn: TrackToReturn = {
				id: section.tracks[i].id,
				name: section.tracks[i].name,
				isCompleted: isTrackCompleted,
				isAvailable: isTrackAvailable,
				units: unitsToReturn,
			}

			for (let b = 0; b < section.tracks[i].units.length; b++) {
				const unitProgress = section.tracks[i].units[b].progresses.find(
					u => u.userId === userId,
				)

				const isUnitCompleted = unitProgress?.isCompleted || false
				const isUnitAvailable =
					isTrackAvailable &&
					(b === 0 ? true : unitsToReturn[b - 1].isCompleted === true)

				const unitToReturn: UnitToReturn = {
					id: section.tracks[i].units[b].id,
					name: section.tracks[i].units[b].name || '',
					isCompleted: isUnitCompleted,
					isAvailable: isUnitAvailable,
				}

				unitsToReturn.push(unitToReturn)
			}

			tracksToReturn.push(trackToReturn)
		}

		return {
			id: section.id,
			name: section.name,
			tracks: tracksToReturn,
		}
	}
}

export type SectionWithRelations = Prisma.SectionGetPayload<{
	include: {
		tracks: {
			include: {
				progresses: true
				units: {
					include: {
						progresses: true
						exercises: true
					}
				}
			}
		}
	}
}>
