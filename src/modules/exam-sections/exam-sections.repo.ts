import { Injectable } from '@nestjs/common'
import { ExamSection } from 'generated/prisma/browser'
import { PrismaService } from 'src/infra/db/prisma.service'

@Injectable()
export class ExamSectionsRepo {
	constructor(private readonly prisma: PrismaService) {}

	async findOne(id: string): Promise<ExamSection | null> {
		return await this.prisma.examSection.findUnique({
			where: { id },
			include: {
				examTasks: true,
			},
		})
	}
}
