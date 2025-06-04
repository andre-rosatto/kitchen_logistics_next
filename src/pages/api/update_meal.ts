// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const id = req.query['id'];
	const recipeId = req.query['recipeId'];
	if (!id || !recipeId) {
		res.status(401).json({
			ok: false,
			error: 'id, recipeId are required.'
		});
	}

	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (update_meal)');

	try {
		await client.connect();
		await client.query(`
			UPDATE meals_recipes
			SET
				recipe_id=$2
			WHERE id=$1;
		`, [id, recipeId]);
		res.status(200).json({
			ok: true,
		});
	} catch (e) {
		res.status(401).json({
			ok: false,
			error: `Connection error: ${e}`
		});
	}
}
