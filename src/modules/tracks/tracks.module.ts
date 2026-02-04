import { Module } from '@nestjs/common'
import { TracksService } from './tracks.service'
import { TracksRepo } from './tracks.repo'
import { TracksController } from './tracks.controller'
import { UserStatesModule } from '../user-states/user-states.module'

@Module({
	imports: [UserStatesModule],
	controllers: [TracksController],
	providers: [TracksService, TracksRepo],
})
export class TracksModule {}
