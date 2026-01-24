import { Module } from '@nestjs/common'
import { UnitProgressesService } from './unit-progresses.service'
import { UnitProgressesRepo } from './unit-progresses.repo'
import { UnitsModule } from '../units/units.module'
import { TrackProgressesModule } from '../track-progresses/track-progresses.module'

@Module({
	imports: [UnitsModule, TrackProgressesModule],
	providers: [UnitProgressesService, UnitProgressesRepo],
	exports: [UnitProgressesService, UnitProgressesRepo],
})
export class UnitProgressesModule {}
