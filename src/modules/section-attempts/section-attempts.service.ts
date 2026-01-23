import { Injectable, NotFoundException } from '@nestjs/common'
import { SectionAttemptsRepo } from './section-attempts.repo'
import { ExamSectionsRepo } from '../exam-sections/exam-sections.repo'
import { ExamSection } from 'generated/prisma/browser'
import { READING_FORMULARS, WRITING_FORMULARS } from './data'
import { ExamTasksRepo } from '../exam-tasks/exam-tasks.repo'
import { ExamSectionAttemptWithRelations } from 'src/core/types'
import { pickRandom } from 'src/utils/pick-random'
import {
	IeltsWritingFormular1,
	IeltsWritingFormular2,
	IeltsWritingFormular3,
} from './data/writting-formulars'
import {
	IeltsReadingFormular1,
	IeltsReadingFormular2,
	IeltsReadingFormular3,
} from './data/reading-formulars'

@Injectable()
export class SectionAttemptsService {
	constructor(
		private readonly sectionAttemptsRepo: SectionAttemptsRepo,
		private readonly examSectionsRepo: ExamSectionsRepo,
		private readonly examTasksRepo: ExamTasksRepo,
	) {}

	async getOne(id: string) {
		const attempt: ExamSectionAttemptWithRelations | null =
			await this.sectionAttemptsRepo.findById(id)

		if (!attempt) {
			throw new NotFoundException('Section Attempt not found here')
		}

		console.log(attempt.tasks)

		return {
			sectionType: attempt.section.type,
			currentTask: attempt.tasks[attempt.currentTaskIndex],
		}
	}

	async getOneOrCreate(userId: string, sectionId: string) {
		const section: ExamSection | null =
			await this.examSectionsRepo.findById(sectionId)
		if (!section) {
			throw new NotFoundException('Exam Section not found')
		}

		const existingAttempt = await this.sectionAttemptsRepo.findOne(userId, sectionId)
		if (existingAttempt) {
			return existingAttempt
		}

		let formular: any

		console.log(section, ' <- Section')

		switch (section.type) {
			case 'reading':
				console.log('Here')
				formular = pickRandom([
					IeltsReadingFormular1,
					IeltsReadingFormular2,
					IeltsReadingFormular3,
				])
				break
			case 'listening':
				// Assign random listening tasks
				break
			case 'speaking':
				// Assign random speaking tasks
				break
			case 'writing':
				console.log('Or here')
				console.log(WRITING_FORMULARS)
				formular = pickRandom([
					IeltsWritingFormular1,
					IeltsWritingFormular2,
					IeltsWritingFormular3,
				])
				break
			default:
				throw new Error('Invalid section type')
		}

		const newAttempt = await this.sectionAttemptsRepo.create(userId, sectionId)

		const tasks: any = []

		console.log(formular, ' <- Formular here')

		for (const task of formular.tasks) {
			const newTask = await this.examTasksRepo.create({
				order: +task.id,
				prompt: task.prompt,
				sectionAttemptId: newAttempt.id,
			})

			tasks.push(newTask)
		}

		return newAttempt
	}
}
