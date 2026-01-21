import { Body, Controller, Post } from '@nestjs/common'
import { AdminTracksService } from './admin-tracks.service'
import { CreateTrackDto } from './dtos/create-track.dto'
import { ApiOperation } from '@nestjs/swagger'

@Controller('admin-tracks')
export class AdminTracksController {
	constructor(private readonly adminTracksService: AdminTracksService) {}

	@ApiOperation({ summary: 'Creates a new track' })
	@Post()
	async create(@Body() dto: CreateTrackDto) {
		return await this.adminTracksService.create(dto)
	}
}
