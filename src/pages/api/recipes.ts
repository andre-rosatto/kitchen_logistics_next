import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (recipes)');

	try {
		await client.connect();
		const data = await client.query(`
			SELECT id, name
			FROM recipes
			ORDER BY name COLLATE "und-x-icu";
		`);
		const ingredients = await client.query(`
			SELECT product_id, recipe_id, amount
			FROM recipes_products;
		`);

		const result = data.rows.map(recipe => ({
			id: recipe.id,
			name: recipe.name,
			ingredients: ingredients.rows.filter(row => row.recipe_id === recipe.id).map(item => ({
				productId: item.product_id,
				amount: parseFloat(item.amount),
			})),
		}));
		res.status(200).json({
			ok: true,
			data: result,
		});
	} catch (e) {
		res.status(401).json({
			ok: false,
			error: `Connection error: ${e}`
		});
	}
}
