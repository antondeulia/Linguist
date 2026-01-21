import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/db/prisma.service'
import { CreateCourseDto } from './dtos/create-course.dto'
import { Course } from 'generated/prisma/client'

@Injectable()
export class AdminCoursesRepo {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateCourseDto): Promise<Course> {
		return await this.prisma.course.create({ data })
	}
}
