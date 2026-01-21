import { Injectable } from '@nestjs/common'
import { CreateTrackDto } from './dtos/create-track.dto'
import { AdminTracksRepo } from './admin-tracks.repo'

@Injectable()
export class AdminTracksService {
	constructor(private readonly adminTracksRepo: AdminTracksRepo) {}

	async create(data: CreateTrackDto) {
		return await this.adminTracksRepo.create(data)
	}
}
