import { Controller, Delete, Get, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { PrismaService } from './infra/db/prisma.service'
import { Course } from 'generated/prisma/browser'

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
		// Coursed
		const courses: Course[] = []

		for (let i = 0; i < 12; i++) {
			const course = await this.prisma.course.create({
				data: {
					name: `English-${i}`,
					sourceLang: 'en',
					targetLang: 'ru',
				},
			})

			courses.push(course)
		}

		const section = await this.prisma.section.create({
			data: {
				name: 'A1-A2',
				courseId: courses[0].id,
			},
		})

		// Track
		for (let i = 0; i < 4; i++) {
			const track = await this.prisma.track.create({
				data: {
					name: `Track #${i + 1}`,
					sectionId: section.id,
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
						rawText: 'Hello',
						sourceLang: 'en',
						targetLang: 'ru',
						direction: 'fromSourceToTarget',
					},
				})
				await this.prisma.exercise.create({
					data: {
						unitId: unit.id,
						type: 'fromSourceToTarget',
						rawText: 'How are you?',
						sourceLang: 'en',
						targetLang: 'ru',
						direction: 'fromSourceToTarget',
					},
				})
				await this.prisma.exercise.create({
					data: {
						unitId: unit.id,
						type: 'fromSourceToTarget',
						rawText: 'My name is Alice',
						sourceLang: 'en',
						targetLang: 'ru',
						direction: 'fromSourceToTarget',
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
