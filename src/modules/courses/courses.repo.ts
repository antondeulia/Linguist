import { Injectable } from '@nestjs/common'
import { Course } from 'generated/prisma/browser'
import { PrismaService } from 'src/infra/db/prisma.service'
import { CreateCourseDto } from './dtos'

@Injectable()
export class CoursesRepo {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateCourseDto): Promise<Course> {
		return await this.prisma.course.create({
			data,
		})
	}

	async delete(id: string): Promise<Course> {
		return await this.prisma.course.delete({
			where: {
				id,
			},
		})
	}

	async getMany(): Promise<Course[] | []> {
		return await this.prisma.course.findMany()
	}

	async getById(id: string) {
		return await this.prisma.course.findUnique({ where: { id } })
	}

	async findByLangs({
		sourceLang,
		targetLang,
	}: {
		sourceLang: string
		targetLang: string
	}): Promise<Course | null> {
		return await this.prisma.course.findFirst({ where: { sourceLang, targetLang } })
	}
}
