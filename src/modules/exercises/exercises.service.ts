import { Injectable, NotFoundException } from '@nestjs/common'
import { ExercisesRepo } from './exercises.repo'
import { ValidateExerciseDto } from './dtos/validate-exercise.dto'
import OpenAI from 'openai'
import { ConfigService } from '@nestjs/config'
import { ValidateExerciseLlmRes } from 'src/core/types/validate-exercise-llm.response'
import { ExerciseProgressRepo } from '../exercise-progress/exercise-progress.repo'
import { UnitProgressesRepo } from '../unit-progresses/unit-progresses.repo'
import { Unit, UnitProgress } from 'generated/prisma/browser'
import { UnitsRepo } from '../units/units.repo'

@Injectable()
export class ExercisesService {
	private readonly client: OpenAI

	constructor(
		private readonly config: ConfigService,
		private readonly exercisesRepo: ExercisesRepo,
		private readonly exerciseProgressRepo: ExerciseProgressRepo,
		private readonly unitProgressRepo: UnitProgressesRepo,
		private readonly unitsRepo: UnitsRepo,
	) {
		this.client = new OpenAI({
			apiKey: this.config.getOrThrow<string>('OPENAI_API_KEY'),
		})
	}

	async getMany(unitId: string) {
		return await this.exercisesRepo.getMany(unitId)
	}

	async validate(data: ValidateExerciseDto) {
		const userId = '1'

		const exercise = await this.exercisesRepo.getById(data.exerciseId)

		if (!exercise) {
			throw new NotFoundException('Exercise does not exist')
		}

		let unitProgress: UnitProgress | null = await this.unitProgressRepo.getOne({
			unitId: exercise.unitId,
			userId,
		})

		const totalExercises = await this.unitsRepo.getExercisesCount(exercise.unitId)

		if (!unitProgress) {
			unitProgress = await this.unitProgressRepo.create({
				unitId: exercise.unitId,
				userId,
				totalExercises,
				completedExercises: 0,
			})
		}

		const result = await this.client.chat.completions.create({
			model: 'gpt-4.1',
			response_format: {
				type: 'json_schema',
				json_schema: {
					name: 'exercise_evaluation',
					schema: {
						type: 'object',
						additionalProperties: false,
						required: [
							'isAcceptable',
							'semanticLevel',
							'detectedLevel',
							'explanation',
						],
						properties: {
							isAcceptable: { type: 'boolean' },
							semanticLevel: { type: 'number', minimum: 0, maximum: 1 },
							detectedLevel: {
								type: 'string',
								enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
							},
							explanation: {
								type: ['string', 'null'],
							},
						},
					},
				},
			},
			messages: [
				{
					role: 'system',
					content: `
						You are a language examiner.
						Evaluate the user's answer.
						Explanation should be very clear and very short, with advice.
						Talk to me "you", not "user" as a third person
					`,
				},
				{
					role: 'user',
					content: JSON.stringify({
						exerciseType: exercise.type,
						exerciseText: exercise.text,
						userResponse: data.response,
						sourceLang: exercise.sourceLang,
						targetLang: exercise.targetLang,
					}),
				},
			],
		})

		const {
			isAcceptable,
			semanticLevel,
			detectedLevel,
			explanation,
		}: ValidateExerciseLlmRes = JSON.parse(result.choices[0].message.content || '')

		const exerciseProgress = await this.exerciseProgressRepo.create({
			userId,
			exerciseId: exercise.id,
		})

		if (isAcceptable) {
			await this.exerciseProgressRepo.update(exerciseProgress.id, {
				semanticLevel,
				detectedLevel,
				explanation,
			})

			if (unitProgress.completedExercises + 1 === unitProgress.totalExercises) {
				await this.unitProgressRepo.update(unitProgress.id, {
					completedExercises: unitProgress.completedExercises + 1,
					isCompleted: true,
				})
			} else {
				await this.unitProgressRepo.update(unitProgress.id, {
					completedExercises: unitProgress.completedExercises + 1,
				})
			}

			return {
				isAcceptable,
				semanticLevel,
				detectedLevel,
				explanation,
			}
		} else {
			return {
				isAcceptable,
				semanticLevel,
				detectedLevel,
				explanation,
			}
		}
	}
}
