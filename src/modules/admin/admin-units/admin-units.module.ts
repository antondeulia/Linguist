import { Module } from '@nestjs/common'
import { AdminUnitsService } from './admin-units.service'
import { AdminUnitsController } from './admin-units.controller'
import { AdminUnitsRepo } from './admin-units.repo'

@Module({
	controllers: [AdminUnitsController],
	providers: [AdminUnitsService, AdminUnitsRepo],
})
export class AdminUnitsModule {}
