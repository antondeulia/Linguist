import { Module } from '@nestjs/common'
import { ExamSectionsService } from './exam-sections.service'
import { ExamSectionsController } from './exam-sections.controller'
import { ExamSectionsRepo } from './exam-sections.repo'

@Module({
	controllers: [ExamSectionsController],
	providers: [ExamSectionsService, ExamSectionsRepo],
	exports: [ExamSectionsRepo],
})
export class ExamSectionsModule {}
