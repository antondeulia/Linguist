import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CreateExerciseDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	type: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	direction: string

	@ApiProperty()
	@IsNotEmpty()
	@IsArray()
	segments: ISegment[]

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	rawText: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	unitId: string

	@ApiProperty()
	@IsNotEmpty()
	@IsBoolean()
	hover: boolean
}

export type ISegment = {
	text: string
	translation: string
	hover: boolean
	exerciseId: string
}
