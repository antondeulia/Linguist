import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/db/prisma.service'
import { CreateSectionProgressInput } from './types/inputs'
import { SectionProgress } from 'generated/prisma/browser'

@Injectable()
export class SectionProgressesRepo {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateSectionProgressInput) {
		return await this.prisma.sectionProgress.create({
			data,
		})
	}

	async findById(id: string): Promise<SectionProgress | null> {
		return await this.prisma.sectionProgress.findUnique({
			where: { id },
		})
	}

	async findMany(userId: string, courseId: string): Promise<SectionProgress[]> {
		return await this.prisma.sectionProgress.findMany({
			where: { userId, section: { courseId } },
		})
	}
}
