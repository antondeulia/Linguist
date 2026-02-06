import { Module } from '@nestjs/common'
import { UnitsService } from './units.service'
import { UnitsController } from './units.controller'
import { UnitsRepo } from './units.repo'
import { UserStatesModule } from '../user-states/user-states.module'

@Module({
	imports: [UserStatesModule],
	controllers: [UnitsController],
	providers: [UnitsService, UnitsRepo],
	exports: [UnitsRepo],
})
export class UnitsModule {}
