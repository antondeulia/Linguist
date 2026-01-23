import { Controller, Get, Param } from '@nestjs/common'
import { ExamsService } from './exams.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Exam } from 'generated/prisma/browser'

@ApiTags('exams')
@Controller('exams')
export class ExamsController {
	constructor(private readonly examsService: ExamsService) {}

	@ApiOperation({ summary: 'Returns an array of available exams' })
	@Get()
	async getMany() {
		return await this.examsService.getMany()
	}

	@ApiOperation({ summary: 'Returns an exam with sections by id' })
	@Get(':id')
	async getOne(@Param('id') id: string): Promise<Exam> {
		return await this.examsService.getOne(id)
	}
}
