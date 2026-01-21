import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { ExerciseType } from 'generated/prisma/enums'

export class CreateExerciseDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	text: string

	@ApiProperty()
	@IsNotEmpty()
	@IsEnum(ExerciseType)
	type: ExerciseType

	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	unitId: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	sourceLang: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	targetLang: string
}
