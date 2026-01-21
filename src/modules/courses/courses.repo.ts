import { Injectable } from '@nestjs/common'
import { Course } from 'generated/prisma/browser'
import { PrismaService } from 'src/infra/db/prisma.service'
import { GetCourseInput } from './types'

@Injectable()
export class CoursesRepo {
	constructor(private readonly prisma: PrismaService) {}

	async getMany(): Promise<Course[] | []> {
		return await this.prisma.course.findMany()
	}

	async getById({ id, userId }: GetCourseInput): Promise<Course | null> {
		return await this.prisma.course.findUnique({
			where: { id },
			include: {
				tracks: {
					include: {
						units: {
							include: {
								unitProgresses: true,
								// unitProgresses: {
								// 	where: {
								// 		userId,
								// 	},
								// },
							},
						},
					},
				},
			},
		})
	}
}
