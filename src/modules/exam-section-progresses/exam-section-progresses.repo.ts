import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/db/prisma.service'
import { CreateExamSectionProgressInput } from '../exam-sections/types'
import { ExamSectionProgress } from 'generated/prisma/browser'
import { FindOneExamSectionProgressInput } from '../exam-sections/types/find-one-exam-section-progress.input'
import { ExamSectionProgressWithSection } from 'src/core/types'

@Injectable()
export class ExamSectionProgressesRepo {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateExamSectionProgressInput): Promise<ExamSectionProgress> {
		return await this.prisma.examSectionProgress.create({
			data,
		})
	}

	async findOne(
		data: FindOneExamSectionProgressInput,
	): Promise<ExamSectionProgress | null> {
		return await this.prisma.examSectionProgress.findFirst({
			where: { sectionId: data.sectionId, userId: data.userId },
		})
	}

	async findById(id: string): Promise<ExamSectionProgressWithSection | null> {
		return await this.prisma.examSectionProgress.findUnique({
			where: { id },
			include: {
				section: {
					include: {
						examTasks: true,
					},
				},
			},
		})
	}
}
