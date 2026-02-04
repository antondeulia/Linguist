import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UnitsService } from './units.service'
import { ApiOperation } from '@nestjs/swagger'
import { CreateUnitDto } from './dtos'

@Controller('units')
export class UnitsController {
	constructor(private readonly unitsService: UnitsService) {}

	@ApiOperation({ summary: 'Creates a new track' })
	@Post()
	async create(@Body() dto: CreateUnitDto) {
		return await this.unitsService.create(dto)
	}

	@ApiOperation({ summary: 'Returns a unit by id' })
	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.unitsService.getById(id)
	}
}
