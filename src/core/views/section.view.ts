type SectionVariant = 'completed' | 'active' | 'locked'

export type SectionView = {
	id: string
	name: string
	variant: SectionVariant
	isCompleted: boolean
	isAccessible: boolean
}
