import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { SectionsService } from './sections.service'
import { CreateSectionDto } from './dtos'
import { ApiOperation } from '@nestjs/swagger'

@Controller('sections')
export class SectionsController {
	constructor(private readonly sectionsService: SectionsService) {}

	@ApiOperation({ summary: 'Creates a new section' })
	@Post()
	async create(@Body() dto: CreateSectionDto) {
		return await this.sectionsService.create(dto)
	}

	@ApiOperation({ summary: 'Returns an array of sections' })
	@Get()
	async getMany() {
		const userId = '1'

		return await this.sectionsService.getMany({ userId })
	}

	@ApiOperation({
		summary: 'Returns an array of parsed sections with tracks and units',
	})
	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.sectionsService.getById(id)
	}

	@ApiOperation({
		summary: 'Returns an array of sections by courseId (for admins)',
	})
	@Get('admin/:courseId')
	async getManyAdmin(@Param('courseId') courseId: string) {
		return await this.sectionsService.getManyAdmin(courseId)
	}

	@ApiOperation({
		summary: 'Returns a section by id',
	})
	@Get('admin/one/:id')
	async getByIdAdmin(@Param('id') id: string) {
		return await this.sectionsService.getByIdAdmin(id)
	}
}
