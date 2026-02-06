import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common'
import { CoursesService } from './courses.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateCourseDto } from './dtos'
import { Course } from 'generated/prisma/browser'

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
	constructor(private readonly coursesService: CoursesService) {}

	@ApiOperation({ summary: 'Returns an array of courses' })
	@Get()
	async getMany() {
		return await this.coursesService.getMany()
	}

	@ApiOperation({ summary: 'Returns a course' })
	@Get(':id')
	async getByIdAdmin(@Param('id') id: string) {
		return await this.coursesService.getByIdAdmin(id)
	}

	@ApiOperation({ summary: 'Creates a new course' })
	@Post()
	async create(@Body() dto: CreateCourseDto): Promise<Course> {
		return await this.coursesService.create(dto)
	}

	@ApiOperation({ summary: 'Deletes a course' })
	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async delete(@Param('id') id: string) {
		return await this.coursesService.delete(id)
	}
}
