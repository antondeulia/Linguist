import { Controller, Get, Param, Post } from '@nestjs/common'
import { ExamSectionProgressesService } from './exam-section-progresses.service'
import { ApiOperation } from '@nestjs/swagger'

@Controller('exam-section-progresses')
export class ExamSectionProgressesController {
	constructor(
		private readonly examSectionProgressesService: ExamSectionProgressesService,
	) {}

	@ApiOperation({ summary: 'Returns a progress by id' })
	@Get(':id')
	async getOne(@Param('id') id: string) {
		return await this.examSectionProgressesService.getOne(id)
	}

	@ApiOperation({ summary: 'Starts an exam section' })
	@Post(':id/start')
	async start(@Param('id') id: string) {
		const userId = '1'
		return await this.examSectionProgressesService.getOneOrCreate({
			userId,
			sectionId: id,
		})
	}
}
