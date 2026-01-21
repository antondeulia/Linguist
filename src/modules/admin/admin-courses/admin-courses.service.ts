import { Injectable } from '@nestjs/common'
import { AdminCoursesRepo } from './admin-courses.repo'
import { CreateCourseDto } from './dtos/create-course.dto'
import { Course } from 'generated/prisma/client'

@Injectable()
export class AdminCoursesService {
	constructor(private readonly coursesRepo: AdminCoursesRepo) {}

	async create(data: CreateCourseDto): Promise<Course> {
		return await this.coursesRepo.create(data)
	}
}
