import { Injectable, NotFoundException } from '@nestjs/common'
import { UserStatesRepo } from './user-states.repo'
import { UserState } from 'generated/prisma/browser'

@Injectable()
export class UserStatesService {
	constructor(private readonly userStatesRepo: UserStatesRepo) {}

	async getByUserId(userId: string): Promise<UserState> {
		const userState = await this.userStatesRepo.findByUserId(userId)

		if (!userState) {
			throw new NotFoundException('User state not found')
		}
		return userState
	}

	async updateOne(userId: string, data: Partial<UserState>) {
		const userState = await this.userStatesRepo.findByUserId(userId)

		if (!userState) {
			throw new NotFoundException('User state not found')
		}

		return await this.userStatesRepo.update(userId, data)
	}
}
