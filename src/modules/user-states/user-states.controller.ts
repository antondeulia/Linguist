import { Body, Controller, Patch } from '@nestjs/common'
import { UserStatesService } from './user-states.service'
import { UpdateUserStateDto } from './dtos'

@Controller('user-states')
export class UserStatesController {
	constructor(private readonly userStatesService: UserStatesService) {}

	@Patch()
	async setCourse(@Body() dto: UpdateUserStateDto) {
		const userId = '1'

		return await this.userStatesService.updateOne(userId, dto)
	}
}
