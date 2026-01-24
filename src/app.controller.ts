import { Controller, Delete, Get, Post } from '@nestjs/common'
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

	@ApiOperation({ summary: 'Seed db' })
	@Post()
	async seedDb() {
		// Course
		const course = await this.prisma.course.create({
			data: {
				name: 'Seed Course',
				sourceLang: 'en',
				targetLang: 'ru',
			},
		})

		// Track
		for (let i = 0; i < 4; i++) {
			const track = await this.prisma.track.create({
				data: {
					name: `Track #${i + 1}`,
					courseId: course.id,
				},
			})

			// Units
			for (let i = 0; i < 3; i++) {
				const unit = await this.prisma.unit.create({
					data: {
						name: `Unit #${i + 1}`,
						trackId: track.id,
					},
				})

				// Exercises
				await this.prisma.exercise.create({
					data: {
						unitId: unit.id,
						type: 'fromSourceToTarget',
						text: 'Hello',
						sourceLang: 'en',
						targetLang: 'ru',
					},
				})
				await this.prisma.exercise.create({
					data: {
						unitId: unit.id,
						type: 'fromSourceToTarget',
						text: 'How are you?',
						sourceLang: 'en',
						targetLang: 'ru',
					},
				})
				await this.prisma.exercise.create({
					data: {
						unitId: unit.id,
						type: 'fromSourceToTarget',
						text: 'My name is Alice',
						sourceLang: 'en',
						targetLang: 'ru',
					},
				})
			}
		}
	}

	@ApiOperation({ summary: 'Clean db' })
	@Delete()
	async cleanDb() {
		// Users
		await this.prisma.user.deleteMany()

		// Courses
		await this.prisma.course.deleteMany()

		// Tracks
		await this.prisma.track.deleteMany()

		// Units
		await this.prisma.unit.deleteMany()

		// Exercises
		await this.prisma.exercise.deleteMany()
	}
}
