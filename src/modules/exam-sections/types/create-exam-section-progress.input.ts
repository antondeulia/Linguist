import { ExamSectionProgressStatusEnum } from 'generated/prisma/enums'

export type CreateExamSectionProgressInput = {
	userId: string
	sectionId: string
	state?: ExamSectionProgressStatusEnum
}
