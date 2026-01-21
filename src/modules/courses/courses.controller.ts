import { Controller, Get, Param } from '@nestjs/common'
import { CoursesService } from './courses.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
	constructor(private readonly coursesService: CoursesService) {}

	@ApiOperation({ summary: 'Returns an array of courses' })
	@Get()
	async getMany() {
		return await this.coursesService.getMany()
	}

	@ApiOperation({ summary: 'Returns a course by id' })
	@Get(':id')
	async getById(@Param('id') id: string) {
		const userId = '1'

		return await this.coursesService.getById({ id, userId })
	}
}
