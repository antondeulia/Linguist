import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ExercisesService } from './exercises.service'
import { ApiOperation } from '@nestjs/swagger'
import { ValidateExerciseDto } from './dtos/validate-exercise.dto'

@Controller('exercises')
export class ExercisesController {
	constructor(private readonly exercisesService: ExercisesService) {}

	@ApiOperation({ summary: 'Returns a list of exercises' })
	@Get(`/:unitId`)
	async getMany(@Param('unitId') unitId: string) {
		return await this.exercisesService.getMany(unitId)
	}

	@ApiOperation({ summary: "Validates user's response" })
	@Post('/validate')
	async validate(@Body() dto: ValidateExerciseDto) {
		return await this.exercisesService.validate(dto)
	}
}
