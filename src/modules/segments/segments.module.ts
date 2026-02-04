import { Module } from '@nestjs/common'
import { SegmentsService } from './segments.service'
import { SegmentsController } from './segments.controller'
import { SegmentsRepo } from './segments.repo'

@Module({
	controllers: [SegmentsController],
	providers: [SegmentsService, SegmentsRepo],
	exports: [SegmentsRepo],
})
export class SegmentsModule {}
