import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/db/prisma.service'
import { CreateSectionDto } from './dtos'
import { Section } from 'generated/prisma/browser'
import { SectionWithRelations } from './sections.service'

@Injectable()
export class SectionsRepo {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateSectionDto): Promise<Section> {
		return await this.prisma.section.create({
			data,
		})
	}

	async findMany(courseId: string): Promise<Section[]> {
		return await this.prisma.section.findMany({
			where: { courseId },
		})
	}

	async findById(id: string): Promise<SectionWithRelations | null> {
		return await this.prisma.section.findUnique({
			where: { id },
			include: {
				tracks: {
					include: {
						progresses: true,
						units: {
							include: {
								progresses: true,
								exercises: true,
							},
						},
					},
				},
			},
		})
	}

	// Admin
	async findByIdAdmin(id: string) {
		return await this.prisma.section.findUnique({
			where: { id },
			include: {
				tracks: {
					include: {
						units: true,
					},
				},
			},
		})
	}
}
