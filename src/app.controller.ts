import { Controller, Get } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { PrismaService } from './infra/db/prisma.service'

@Controller()
export class AppController {
	constructor(private readonly prisma: PrismaService) {}

	@ApiOperation({ summary: 'Check status' })
	@Get()
	getStatus() {
		return { status: 200 }
	}

	@ApiOperation({ summary: 'Check DB health' })
	@Get('db')
	async getDbHealth() {
		return await this.prisma.user.findMany()
	}
}
