import { Injectable, NotFoundException } from '@nestjs/common'
import { SectionProgressesRepo } from './section-progresses.repo'
import { CreateSectionProgressInput } from './types/inputs'
import { SectionProgress } from 'generated/prisma/browser'

@Injectable()
export class SectionProgressesService {
	constructor(private readonly sectionProgressesRepo: SectionProgressesRepo) {}

	async create(data: CreateSectionProgressInput) {
		return await this.sectionProgressesRepo.create(data)
	}

	async getById(id: string): Promise<SectionProgress> {
		const sectionProgress = await this.sectionProgressesRepo.findById(id)

		if (!sectionProgress) {
			throw new NotFoundException('Section progress does not exist')
		}

		return sectionProgress
	}

	async getMany(userId: string, courseId: string) {
		return await this.sectionProgressesRepo.findMany(userId, courseId)
	}
}
