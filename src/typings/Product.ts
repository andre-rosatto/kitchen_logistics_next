export type Product = {
	id: string;
	name: string;
	unit: string;
	x1000: string;
}


export const isProduct = (obj: unknown): obj is Product => {
	return (
		typeof obj === 'object' && obj !== null
		&& 'id' in obj && typeof obj.id === 'string'
		&& 'name' in obj && typeof obj.name === 'string'
		&& 'unit' in obj && typeof obj.unit === 'string'
		&& 'x1000' in obj && typeof obj.x1000 === 'string'
	);
}

export const isProductArray = (obj: unknown): obj is Product[] => {
	if (!Array.isArray(obj)) return false;
	return obj.every(o => isProduct(o));
}