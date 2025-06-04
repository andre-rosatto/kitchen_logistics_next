import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (meals)');

	try {
		await client.connect();
		const meals = await client.query(`
			SELECT id, amount, day
			FROM meals
			ORDER BY day;
		`);
		const recipes = await client.query(`
			SELECT id, meal_id, recipe_id, is_lunch
			FROM meals_recipes;
		`);
		const result = meals.rows.map(meal => ({
			id: meal.id,
			amount: meal.amount,
			day: meal.day,
			recipes: recipes.rows.filter(recipe => recipe.meal_id === meal.id).map(recipe => ({
				id: recipe.id,
				recipeId: recipe.recipe_id,
				isLunch: recipe.is_lunch,
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
