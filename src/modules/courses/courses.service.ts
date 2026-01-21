import { Injectable, NotFoundException } from '@nestjs/common'
import { CoursesRepo } from './courses.repo'
import { Course } from 'generated/prisma/browser'
import { GetCourseInput } from './types'

@Injectable()
export class CoursesService {
	constructor(private readonly coursesRepo: CoursesRepo) {}

	async getMany(): Promise<Course[] | []> {
		return await this.coursesRepo.getMany()
	}

	async getById(data: GetCourseInput): Promise<Course> {
		const course: Course | null = await this.coursesRepo.getById(data)

		if (!course) {
			throw new NotFoundException('Course not found')
		}

		return course
	}
}
