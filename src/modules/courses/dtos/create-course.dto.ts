import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCourseDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty({ example: 'en' })
	@IsNotEmpty()
	@IsString()
	sourceLang: string

	@ApiProperty({ example: 'en' })
	@IsNotEmpty()
	@IsString()
	targetLang: string
}
