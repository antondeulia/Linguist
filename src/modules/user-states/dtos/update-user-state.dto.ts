import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateUserStateDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	currentCourseId?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	currentSectionId?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	currentUnitId?: string
}
