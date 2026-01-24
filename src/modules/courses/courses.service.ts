import { Injectable, NotFoundException } from '@nestjs/common'
import { CoursesRepo, CourseWithRelations } from './courses.repo'
import { Course } from 'generated/prisma/browser'
import { GetCourseInput, TrackToReturn, UnitToReturn } from './types'

@Injectable()
export class CoursesService {
	constructor(private readonly coursesRepo: CoursesRepo) {}

	async getMany(): Promise<Course[] | []> {
		return await this.coursesRepo.getMany()
	}

	async getById(data: GetCourseInput): Promise<any> {
		const course: CourseWithRelations | null = await this.coursesRepo.getById(data)

		if (!course) {
			throw new NotFoundException('Course not found')
		}

		const userId = '1'

		/* 
		 course {
		 	id: string
			name: string;
			sourceLang: string;
			targetLang: string;

			tracks: [
				{
					id: string
					isCompleted: boolean
					name: string

					units: [
						id: string;
						isCompleted: boolean
						name: string;

						exercises: [
							...
						]
					]
				}
			]
		 }
		 
		 */

		const tracksToReturn: TrackToReturn[] = []

		for (let i = 0; i < course.tracks.length; i++) {
			let unitsToReturn: UnitToReturn[] = []

			const trackProgress = course.tracks[i].progresses.find(
				p => p.userId === userId,
			)

			const isTrackCompleted = trackProgress?.isCompleted || false
			const isTrackAvailable =
				i === 0 ? true : tracksToReturn[i - 1].isCompleted === true

			const trackToReturn: TrackToReturn = {
				id: course.tracks[i].id,
				name: course.tracks[i].name,
				isCompleted: isTrackCompleted,
				isAvailable: isTrackAvailable,
				units: unitsToReturn,
			}

			for (let b = 0; b < course.tracks[i].units.length; b++) {
				const unitProgress = course.tracks[i].units[b].progresses.find(
					u => u.userId === userId,
				)

				const isUnitCompleted = unitProgress?.isCompleted || false
				const isUnitAvailable =
					isTrackAvailable &&
					(b === 0 ? true : unitsToReturn[b - 1].isCompleted === true)

				const unitToReturn: UnitToReturn = {
					id: course.tracks[i].units[b].id,
					name: course.tracks[i].units[b].name || '',
					isCompleted: isUnitCompleted,
					isAvailable: isUnitAvailable,
				}

				unitsToReturn.push(unitToReturn)
			}

			tracksToReturn.push(trackToReturn)
		}

		return {
			id: course.id,
			name: course.name,
			sourceLang: course.sourceLang,
			targetLang: course.targetLang,
			tracks: tracksToReturn,
		}
	}
}
