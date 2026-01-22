import { Module } from '@nestjs/common'
import { ExamsService } from './exams.service'
import { ExamsController } from './exams.controller'
import { ExamsRepo } from './exams.repo'

@Module({
	controllers: [ExamsController],
	providers: [ExamsService, ExamsRepo],
})
export class ExamsModule {}
