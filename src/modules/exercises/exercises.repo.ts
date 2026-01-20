import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/db/prisma.service'

@Injectable()
export class ExercisesRepo {
	constructor(private readonly prisma: PrismaService) {}

	async getMany() {
		return await this.prisma.exercise.findMany()
	}
}
