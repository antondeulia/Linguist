import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/db/prisma.service'
import { CreateExamTaskInput } from './types'

@Injectable()
export class ExamTasksRepo {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateExamTaskInput) {
		return await this.prisma.examTask.create({
			data,
		})
	}
}
