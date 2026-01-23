import { Injectable, NotFoundException } from '@nestjs/common'
import { ExamsRepo } from './exams.repo'
import { Exam } from 'generated/prisma/browser'

@Injectable()
export class ExamsService {
	constructor(private readonly examsRepo: ExamsRepo) {}

	async getMany() {
		return await this.examsRepo.findMany()
	}

	async getOne(id: string): Promise<Exam> {
		const exam = await this.examsRepo.findById(id)

		if (!exam) {
			throw new NotFoundException('Exam not found')
		}

		return exam
	}
}
