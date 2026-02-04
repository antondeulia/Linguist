import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateTrackDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsDefined()
	name: string

	@ApiProperty()
	@IsUUID()
	@IsNotEmpty()
	@IsDefined()
	sectionId: string
}
