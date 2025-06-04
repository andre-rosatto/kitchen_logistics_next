export type Meal = {
	id: string;
	day: number;
	amount: number;
	recipes: {
		id: string;
		recipeId: string;
		isLunch: boolean;
	}[]
}

export const isMealArray = (obj: unknown): obj is Meal => {
	if (!obj || typeof obj !== 'object') return false;
	return (
		Array.isArray(obj) && obj.every(o => (
			'id' in o && typeof o.id === 'string'
			&& 'day' in o && typeof o.day === 'number'
			&& 'amount' in o && typeof o.amount === 'number'
		))
	);
}