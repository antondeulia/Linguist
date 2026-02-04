import { Module } from '@nestjs/common'
import { UserStatesService } from './user-states.service'
import { UserStatesController } from './user-states.controller'
import { UserStatesRepo } from './user-states.repo'

@Module({
	controllers: [UserStatesController],
	providers: [UserStatesService, UserStatesRepo],
	exports: [UserStatesService],
})
export class UserStatesModule {}
