import { Module } from '@nestjs/common'
import { UnitsService } from './units.service'
import { UnitsController } from './units.controller'
import { UnitsRepo } from './units.repo'

@Module({
	controllers: [UnitsController],
	providers: [UnitsService, UnitsRepo],
	exports: [UnitsRepo],
})
export class UnitsModule {}
