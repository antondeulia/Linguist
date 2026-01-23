import { Module } from '@nestjs/common'
import { ExamTasksService } from './exam-tasks.service'
import { ExamTasksController } from './exam-tasks.controller'
import { ExamTasksRepo } from './exam-tasks.repo'

@Module({
	controllers: [ExamTasksController],
	providers: [ExamTasksService, ExamTasksRepo],
	exports: [ExamTasksRepo],
})
export class ExamTasksModule {}
