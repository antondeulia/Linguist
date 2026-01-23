import { Injectable } from '@nestjs/common'
import { ExamSectionAttempt } from 'generated/prisma/browser'
import { ExamSectionAttemptWithRelations } from 'src/core/types'
import { PrismaService } from 'src/infra/db/prisma.service'

@Injectable()
export class SectionAttemptsRepo {
	constructor(private readonly prisma: PrismaService) {}

	async create(userId: string, sectionId: string) {
		return await this.prisma.examSectionAttempt.create({
			data: {
				userId,
				sectionId,
			},
		})
	}

	async findOne(userId: string, sectionId: string) {
		return await this.prisma.examSectionAttempt.findFirst({
			where: {
				userId,
				sectionId,
			},
		})
	}

	async findById(id: string): Promise<ExamSectionAttemptWithRelations | null> {
		return await this.prisma.examSectionAttempt.findUnique({
			where: { id },
			include: {
				tasks: true,
				section: {
					include: {
						attempts: {
							include: {
								tasks: true,
							},
						},
					},
				},
			},
		})
	}
}
