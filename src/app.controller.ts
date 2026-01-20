import { Controller, Get } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

@Controller()
export class AppController {
	@ApiOperation({ summary: 'Check status' })
	@Get()
	getStatus() {
		return { status: 200 }
	}
}
