export type Recipe = {
	id: string;
	name: string;
	ingredients: {
		ingredientId: string,
		productId: string,
		amount: number,
	}[]
}

export const isRecipeArray = (obj: unknown): obj is Recipe[] => {
	if (!obj || typeof obj !== 'object') return false;
	return (
		Array.isArray(obj) && obj.every(o => (
			'id' in o && typeof o.id === 'string'
			&& 'name' in o && typeof o.name === 'string'
			&& 'ingredients' in o && Array.isArray(o.ingredients)
		))
	);
}