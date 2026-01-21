import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class ValidateExerciseDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	exerciseId: string

	@ApiProperty()
	@IsString()
	response: string
}
