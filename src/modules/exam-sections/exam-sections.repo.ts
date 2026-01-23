import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/db/prisma.service'

@Injectable()
export class ExamSectionsRepo {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: string) {
		return await this.prisma.examSection.findUnique({ where: { id } })
	}
}
