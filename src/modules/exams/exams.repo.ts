import { Injectable } from '@nestjs/common'
import { Exam } from 'generated/prisma/browser'
import { PrismaService } from 'src/infra/db/prisma.service'

@Injectable()
export class ExamsRepo {
	constructor(private readonly prisma: PrismaService) {}

	async findMany(): Promise<Exam[]> {
		return await this.prisma.exam.findMany()
	}

	async findById(id: string): Promise<Exam | null> {
		return await this.prisma.exam.findUnique({
			where: { id },
			include: {
				sections: true,
			},
		})
	}
}
