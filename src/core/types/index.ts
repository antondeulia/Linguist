import { Prisma } from 'generated/prisma/browser'

export type ExamSectionAttemptWithRelations = Prisma.ExamSectionAttemptGetPayload<{
	include: {
		tasks: true
		section: {
			include: {
				attempts: {
					include: {
						tasks: true
					}
				}
			}
		}
	}
}>
