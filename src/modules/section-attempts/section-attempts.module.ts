import { Module } from '@nestjs/common'
import { SectionAttemptsService } from './section-attempts.service'
import { SectionAttemptsController } from './section-attempts.controller'
import { SectionAttemptsRepo } from './section-attempts.repo'
import { ExamSectionsModule } from '../exam-sections/exam-sections.module'
import { ExamTasksModule } from '../exam-tasks/exam-tasks.module'

@Module({
	imports: [ExamSectionsModule, ExamTasksModule],
	controllers: [SectionAttemptsController],
	providers: [SectionAttemptsService, SectionAttemptsRepo],
})
export class SectionAttemptsModule {}
