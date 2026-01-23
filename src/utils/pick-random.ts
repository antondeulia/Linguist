export function pickRandom<T>(arr: T[]): T {
	console.log(arr)
	return arr[Math.floor(Math.random() * arr?.length)]
}
