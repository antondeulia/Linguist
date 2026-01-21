import { Module } from '@nestjs/common'
import { AdminCoursesService } from './admin-courses.service'
import { AdminCoursesController } from './admin-courses.controller'
import { AdminCoursesRepo } from './admin-courses.repo'

@Module({
	controllers: [AdminCoursesController],
	providers: [AdminCoursesService, AdminCoursesRepo],
})
export class AdminCoursesModule {}
