import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Track } from 'generated/prisma/browser'
import { TracksService } from './tracks.service'
import { CreateTrackDto } from './dtos'

@ApiTags('tracks')
@Controller('tracks')
export class TracksController {
	constructor(private readonly tracksService: TracksService) {}

	@ApiOperation({ summary: 'Creates a new track' })
	@Post()
	async create(@Body() dto: CreateTrackDto) {
		return await this.tracksService.create(dto)
	}

	@ApiOperation({ summary: 'Returns an array of tracks' })
	@Get()
	async getMany() {
		return await this.tracksService.getMany()
	}

	@ApiOperation({ summary: 'Returns a track by id' })
	@Get(':id')
	async getById(@Param('id') id: string): Promise<Track> {
		return await this.tracksService.getById(id)
	}
}
