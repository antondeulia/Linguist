import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateSectionDto {
	@ApiProperty()
	@IsUUID()
	@IsNotEmpty()
	@IsDefined()
	courseId: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsDefined()
	name: string
}
