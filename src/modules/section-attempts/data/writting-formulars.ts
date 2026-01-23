export const IeltsWritingFormular1 = {
	code: 'academic_writing_v1',
	section: 'writing',
	version: 'academic',

	tasks: [
		{
			id: '1',
			prompt: {
				instructions:
					'WRITING #3: You should spend about 20 minutes on this task.',
				passage: 'The graph below shows ... babis)))',
				minWords: 150,
			},
		},
		{
			id: '2',
			prompt: {
				instructions: 'WRITING #2: Write an essay about my baby)))',
				passage: 'Second time hallo babis))',
				minWord: 250,
			},
		},
	],
}

export const IeltsWritingFormular2 = {
	code: 'academic_writing_v2',
	section: 'writing',
	version: 'academic',

	tasks: [
		{
			id: '1',
			prompt: {
				instructions:
					'WRITING TASK 1: You should spend about 20 minutes on this task.',
				passage:
					'The table below shows the number of students enrolled in different courses over a five-year period.',
				minWords: 150,
			},
		},
		{
			id: '2',
			prompt: {
				instructions:
					'WRITING TASK 2: Some people think university education should be free.',
				passage: 'Discuss both views and give your own opinion.',
				minWords: 250,
			},
		},
	],
}

export const IeltsWritingFormular3 = {
	code: 'academic_writing_v3',
	section: 'writing',
	version: 'academic',

	tasks: [
		{
			id: '1',
			prompt: {
				instructions:
					'WRITING TASK 1: You should spend about 20 minutes on this task.',
				passage:
					'The diagram below shows the process of recycling plastic bottles.',
				minWords: 150,
			},
		},
		{
			id: '2',
			prompt: {
				instructions:
					'WRITING TASK 2: Many people believe that technology has improved education.',
				passage: 'To what extent do you agree or disagree?',
				minWords: 250,
			},
		},
	],
}
