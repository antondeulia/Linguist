import { Controller, Get, Param, Post } from '@nestjs/common'
import { ExamSectionsService } from './exam-sections.service'
import { ApiOperation } from '@nestjs/swagger'

@Controller('exam-sections')
export class ExamSectionsController {
	constructor(private readonly examSectionsService: ExamSectionsService) {}

	@ApiOperation({ summary: 'Returns an exam section by id' })
	@Get(':id')
	async getOne(@Param('id') id: string) {
		return await this.examSectionsService.getOne(id)
	}
}
