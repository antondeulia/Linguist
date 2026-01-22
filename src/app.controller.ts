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
			for (let i = 0; i < 8; i++) {
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

		// IELTS
		await this.prisma.exam.create({
			data: {
				code: 'IELTS',
				name: 'IELTS Academic',
				examSections: {
					create: [
						{
							type: 'listening',
							examTasks: {
								create: [
									{
										taskType: 'listening_mcq',
										timeLimit: 1800,
										config: {
											audioUrl: 'ielts/listening/section1.mp3',
											questions: 10,
										},
									},
								],
							},
						},
						{
							type: 'reading',
							examTasks: {
								create: [
									{
										taskType: 'reading_passage',
										timeLimit: 3600,
										config: {
											passages: 3,
											questionsPerPassage: 13,
										},
									},
								],
							},
						},
						{
							type: 'writing',
							examTasks: {
								create: [
									{
										taskType: 'writing_task1',
										timeLimit: 20 * 60,
										config: {
											prompt: 'The chart below shows...',
											minWords: 150,
											rubric: [
												'taskAchievement',
												'coherence',
												'grammar',
												'vocabulary',
											],
										},
									},
									{
										taskType: 'writing_task2',
										timeLimit: 40 * 60,
										config: {
											prompt: 'Some people think that governments should...',
											minWords: 250,
											rubric: [
												'taskResponse',
												'coherence',
												'grammar',
												'vocabulary',
											],
										},
									},
								],
							},
						},
						{
							type: 'speaking',
							examTasks: {
								create: [
									{
										taskType: 'speaking_part1',
										timeLimit: 5 * 60,
										config: {
											questions: [
												'Do you work or study?',
												'Do you like your hometown?',
											],
										},
									},
									{
										taskType: 'speaking_long_turn',
										timeLimit: 3 * 60,
										config: {
											cueCard:
												'Describe a place you enjoy visiting.',
											prepTime: 60,
											speakTime: 120,
										},
									},
									{
										taskType: 'speaking_discussion',
										timeLimit: 5 * 60,
										config: {
											topic: 'Tourism and local culture',
										},
									},
								],
							},
						},
					],
				},
			},
		})

		// TOFEL
		await this.prisma.exam.create({
			data: {
				code: 'TOEFL',
				name: 'TOEFL iBT',
				examSections: {
					create: [
						{
							type: 'reading',
							examTasks: {
								create: [
									{
										taskType: 'reading_mcq',
										timeLimit: 1200,
										config: {
											passageLength: 'long',
											questions: 10,
										},
									},
								],
							},
						},
						{
							type: 'listening',
							examTasks: {
								create: [
									{
										taskType: 'listening_conversation',
										timeLimit: 900,
										config: {
											conversations: 2,
											lectures: 1,
										},
									},
								],
							},
						},
						{
							type: 'speaking',
							examTasks: {
								create: [
									{
										taskType: 'speaking_integrated',
										timeLimit: 60,
										config: {
											readingTime: 45,
											listeningTime: 60,
											speakingTime: 60,
										},
									},
								],
							},
						},
						{
							type: 'writing',
							examTasks: {
								create: [
									{
										taskType: 'writing_integrated',
										timeLimit: 20 * 60,
										config: {
											reading: true,
											listening: true,
											minWords: 150,
										},
									},
									{
										taskType: 'writing_independent',
										timeLimit: 30 * 60,
										config: {
											prompt: 'Do you agree or disagree...',
											minWords: 300,
										},
									},
								],
							},
						},
					],
				},
			},
		})
	}

	@ApiOperation({ summary: 'Clean db' })
	@Delete()
	async cleanDb() {
		// Courses
		await this.prisma.course.deleteMany()

		// Tracks
		await this.prisma.track.deleteMany()

		// Units
		await this.prisma.unit.deleteMany()

		// Exercises
		await this.prisma.exercise.deleteMany()

		// Exams
		await this.prisma.exam.deleteMany()
	}
}
