import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { SectionAttemptsService } from './section-attempts.service'
import { ApiOperation } from '@nestjs/swagger'
import { GetOneOrCreateAttemptDto } from './dtos'

@Controller('section-attempts')
export class SectionAttemptsController {
	constructor(private readonly sectionAttemptsService: SectionAttemptsService) {}

	@ApiOperation({ summary: 'Returns a section attempt' })
	@Get(':id')
	async getOne(@Param('id') id: string) {
		return await this.sectionAttemptsService.getOne(id)
	}

	@ApiOperation({ summary: 'Get existing attempt or create a new one' })
	@Post('start')
	async getOneOrCreate(@Body() dto: GetOneOrCreateAttemptDto) {
		const userId = '1'
		return await this.sectionAttemptsService.getOneOrCreate(userId, dto.sectionId)
	}
}
