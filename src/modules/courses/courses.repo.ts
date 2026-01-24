import { Injectable } from '@nestjs/common'
import { Course, Prisma } from 'generated/prisma/browser'
import { PrismaService } from 'src/infra/db/prisma.service'
import { GetCourseInput } from './types'

@Injectable()
export class CoursesRepo {
	constructor(private readonly prisma: PrismaService) {}

	async getMany(): Promise<Course[] | []> {
		return await this.prisma.course.findMany()
	}

	async getById({ id, userId }: GetCourseInput): Promise<CourseWithRelations | null> {
		return await this.prisma.course.findUnique({
			where: { id },
			include: {
				tracks: {
					include: {
						progresses: true,
						units: {
							include: {
								progresses: true,
							},
						},
					},
				},
			},
		})
	}
}

export type CourseWithRelations = Prisma.CourseGetPayload<{
	include: {
		tracks: {
			include: {
				progresses: true
				units: {
					include: {
						progresses: true
					}
				}
			}
		}
	}
}>
