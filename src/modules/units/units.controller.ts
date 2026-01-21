import { Controller, Get, Param } from '@nestjs/common'
import { UnitsService } from './units.service'
import { ApiOperation } from '@nestjs/swagger'

@Controller('units')
export class UnitsController {
	constructor(private readonly unitsService: UnitsService) {}

	@ApiOperation({ summary: 'Returns a unit by id' })
	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.unitsService.getById(id)
	}
}
