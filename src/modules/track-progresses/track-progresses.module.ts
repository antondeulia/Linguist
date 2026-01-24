import { Module } from '@nestjs/common'
import { TrackProgressesService } from './track-progresses.service'
import { TrackProgressesRepo } from './track-progresses.repo'
import { UnitsModule } from '../units/units.module'

@Module({
	imports: [UnitsModule],
	providers: [TrackProgressesService, TrackProgressesRepo],
	exports: [TrackProgressesService, TrackProgressesRepo],
})
export class TrackProgressesModule {}
