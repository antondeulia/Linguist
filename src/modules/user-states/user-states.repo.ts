import { Injectable } from '@nestjs/common'
import { UserState } from 'generated/prisma/browser'
import { PrismaService } from 'src/infra/db/prisma.service'

@Injectable()
export class UserStatesRepo {
	constructor(private readonly prisma: PrismaService) {}

	async findByUserId(userId: string) {
		return await this.prisma.userState.findUnique({ where: { userId } })
	}

	async update(userId: string, data: Partial<UserState>) {
		return await this.prisma.userState.update({
			where: { userId },
			data,
		})
	}
}
