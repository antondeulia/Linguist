import { Module } from '@nestjs/common'
import { AdminTracksService } from './admin-tracks.service'
import { AdminTracksController } from './admin-tracks.controller'
import { AdminTracksRepo } from './admin-tracks.repo'

@Module({
	controllers: [AdminTracksController],
	providers: [AdminTracksService, AdminTracksRepo],
})
export class AdminTracksModule {}
