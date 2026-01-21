import { Body, Controller, Post } from '@nestjs/common'
import { AdminExercisesService } from './admin-exercises.service'
import { ApiOperation } from '@nestjs/swagger'
import { CreateExerciseDto } from './dtos/create-exercise.dto'

@Controller('admin-exercises')
export class AdminExercisesController {
	constructor(private readonly adminExercisesService: AdminExercisesService) {}

	@ApiOperation({ summary: 'Creates a new exercise' })
	@Post()
	async create(@Body() dto: CreateExerciseDto) {
		return await this.adminExercisesService.create(dto)
	}
}
