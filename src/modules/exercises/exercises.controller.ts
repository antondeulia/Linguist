import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ExercisesService } from './exercises.service'
import { ApiOperation } from '@nestjs/swagger'
import { CreateExerciseDto, ValidateExerciseDto } from './dtos'

@Controller('exercises')
export class ExercisesController {
	constructor(private readonly exercisesService: ExercisesService) {}

	@ApiOperation({ summary: 'Returns a list of exercises by current unit id' })
	@Get()
	async getMany() {
		const userId = '1'

		return await this.exercisesService.getMany(userId)
	}

	@ApiOperation({ summary: "Validates user's response" })
	@Post('/validate')
	async validate(@Body() dto: ValidateExerciseDto) {
		return await this.exercisesService.validate(dto)
	}

	@ApiOperation({ summary: 'Creates a new exercise' })
	@Post()
	async create(@Body() dto: CreateExerciseDto) {
		return await this.exercisesService.create(dto)
	}
}
