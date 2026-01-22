import { Injectable, NotFoundException } from '@nestjs/common'
import { ExamSectionProgressesRepo } from './exam-section-progresses.repo'
import { CreateExamSectionProgressInput } from '../exam-sections/types'
import { ExamSectionProgress } from 'generated/prisma/browser'

@Injectable()
export class ExamSectionProgressesService {
	constructor(private readonly examSectionProgressRepo: ExamSectionProgressesRepo) {}

	async getOne(id: string) {
		const progress = await this.examSectionProgressRepo.findById(id)

		if (!progress) {
			throw new NotFoundException('ExamSectionProgress not found')
		}

		const tasks = progress.section.examTasks
		const task = tasks[progress.currentTaskIndex]

		return {
			progressId: progress.id,
			sectionType: progress.section.type,
			task,
		}
	}

	async getOneOrCreate(
		data: CreateExamSectionProgressInput,
	): Promise<ExamSectionProgress> {
		const existingProgress = await this.examSectionProgressRepo.findOne(data)

		if (existingProgress) {
			return existingProgress
		}

		const newProgress = await this.examSectionProgressRepo.create({
			sectionId: data.sectionId,
			userId: data.userId,
			state: 'in_progress',
		})

		return newProgress
	}
}
