import { Injectable, NotFoundException } from '@nestjs/common'
import { ExamSectionsRepo } from './exam-sections.repo'
import { ExamSection } from 'generated/prisma/browser'

@Injectable()
export class ExamSectionsService {
	constructor(private readonly examSectionsRepo: ExamSectionsRepo) {}

	async getOne(id: string): Promise<ExamSection> {
		const section = await this.examSectionsRepo.findOne(id)

		if (!section) {
			throw new NotFoundException('Section not found')
		}
		return section
	}
}
