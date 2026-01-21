export interface ValidateExerciseLlmRes {
	isAcceptable: boolean
	semanticLevel: number
	detectedLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
	explanation: string | null
}
