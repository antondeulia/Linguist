import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/db/prisma.service'

@Injectable()
export class TracksRepo {
	constructor(private readonly prisma: PrismaService) {}
}
