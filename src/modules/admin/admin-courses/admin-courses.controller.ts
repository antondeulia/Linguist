import { Body, Controller, Post } from '@nestjs/common'
import { AdminCoursesService } from './admin-courses.service'
import { CreateCourseDto } from './dtos/create-course.dto'
import { Course } from 'generated/prisma/client'
import { ApiOperation } from '@nestjs/swagger'

@Controller('admin-courses')
export class AdminCoursesController {
	constructor(private readonly adminCoursesService: AdminCoursesService) {}

	@ApiOperation({ summary: 'Creates a new course' })
	@Post()
	async create(@Body() dto: CreateCourseDto): Promise<Course> {
		return await this.adminCoursesService.create(dto)
	}
}
