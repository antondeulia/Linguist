import { Body, Controller, Post } from '@nestjs/common'
import { AdminUnitsService } from './admin-units.service'
import { ApiOperation } from '@nestjs/swagger'
import { CreateUnitDto } from './dtos/create-unit.dto'
import { Unit } from 'generated/prisma/client'

@Controller('admin-units')
export class AdminUnitsController {
	constructor(private readonly adminUnitsService: AdminUnitsService) {}

	@ApiOperation({ summary: 'Creates a new Unit' })
	@Post()
	async create(@Body() dto: CreateUnitDto): Promise<Unit> {
		return await this.adminUnitsService.create(dto)
	}
}
