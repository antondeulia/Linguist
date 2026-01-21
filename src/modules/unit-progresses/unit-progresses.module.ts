import { Module } from '@nestjs/common'
import { UnitProgressesService } from './unit-progresses.service'
import { UnitProgressesRepo } from './unit-progresses.repo'

@Module({
	providers: [UnitProgressesService, UnitProgressesRepo],
	exports: [UnitProgressesRepo],
})
export class UnitProgressesModule {}
