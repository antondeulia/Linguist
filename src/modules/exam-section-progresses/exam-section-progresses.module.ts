import { Module } from '@nestjs/common'
import { ExamSectionProgressesService } from './exam-section-progresses.service'
import { ExamSectionProgressesController } from './exam-section-progresses.controller'
import { ExamSectionProgressesRepo } from './exam-section-progresses.repo'

@Module({
	controllers: [ExamSectionProgressesController],
	providers: [ExamSectionProgressesService, ExamSectionProgressesRepo],
})
export class ExamSectionProgressesModule {}
