import { Module } from '@nestjs/common'
import { SectionProgressesService } from './section-progresses.service'
import { SectionProgressesRepo } from './section-progresses.repo'

@Module({
	providers: [SectionProgressesService, SectionProgressesRepo],
	exports: [SectionProgressesService],
})
export class SectionProgressesModule {}
