import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CoursesRepo } from './courses.repo'
import { Course } from 'generated/prisma/browser'
import { GetCourseInput, TrackToReturn, UnitToReturn } from './types'
import { CreateCourseDto } from './dtos'

@Injectable()
export class CoursesService {
	constructor(private readonly coursesRepo: CoursesRepo) {}

	async getMany(): Promise<Course[] | []> {
		return await this.coursesRepo.getMany()
	}

	async create(data: CreateCourseDto): Promise<Course> {
		const existing = await this.coursesRepo.findByLangs({
			sourceLang: data.sourceLang,
			targetLang: data.targetLang,
		})

		if (existing) {
			throw new ConflictException('Course with these languages already exists')
		}

		return await this.coursesRepo.create(data)
	}

	async delete(id: string): Promise<Course> {
		const existing = await this.coursesRepo.getById(id)

		if (!existing) {
			throw new NotFoundException('Course does not exist')
		}

		return await this.coursesRepo.delete(id)
	}
}
