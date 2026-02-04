import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateUnitDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsDefined()
	name: string

	@ApiProperty()
	@IsUUID()
	@IsNotEmpty()
	@IsDefined()
	trackId: string
}
