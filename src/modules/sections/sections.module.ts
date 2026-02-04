import { Module } from '@nestjs/common'
import { SectionsService } from './sections.service'
import { SectionsController } from './sections.controller'
import { SectionsRepo } from './sections.repo'
import { SectionProgressesModule } from '../section-progresses/section-progresses.module'
import { UserStatesModule } from '../user-states/user-states.module'

@Module({
	imports: [SectionProgressesModule, UserStatesModule],
	controllers: [SectionsController],
	providers: [SectionsService, SectionsRepo],
})
export class SectionsModule {}
