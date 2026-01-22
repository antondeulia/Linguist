import { Prisma } from 'generated/prisma/browser'

export type ExamSectionProgressWithSection = Prisma.ExamSectionProgressGetPayload<{
	include: {
		section: {
			include: {
				examTasks: true
			}
		}
	}
}>
