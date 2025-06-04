import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const recipeId = req.query['recipeId'];
	const mealId = req.query['mealId'];
	const isLunch = req.query['isLunch'];
	console.log(recipeId);
	console.log(mealId);
	console.log(isLunch);

	if (!recipeId || !mealId) {
		res.status(401).json({
			ok: false,
			error: 'recipeId, mealId and isLunch are required.'
		});
	}

	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (add_meal)');

	try {
		await client.connect();
		const data = await client.query(`
			INSERT INTO meals_recipes (recipe_id, meal_id, is_lunch)
			VALUES ($1, $2, $3)
			RETURNING id, recipe_id;
		`, [recipeId, mealId, isLunch]);
		res.status(200).json({
			ok: true,
			data: data.rows[0],
		});
	} catch (e) {
		res.status(401).json({
			ok: false,
			error: `Connection error: ${e}`
		});
	}
}
