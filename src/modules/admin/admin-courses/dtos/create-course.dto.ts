import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCourseDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	sourceLang: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	targetLang: string
}
