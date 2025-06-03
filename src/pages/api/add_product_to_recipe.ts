// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const recipeId = req.query['recipeId'];
	const productId = req.query['productId'];
	const amount = req.query['amount'] ?? 0;
	if (!recipeId || !productId) {
		res.status(401).json({
			ok: false,
			error: 'recipeId and productId are required;'
		});
	}


	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (add_product_to_recipe)');

	try {
		await client.connect();
		const data = await client.query(`
			INSERT INTO recipes_products (recipe_id, product_id, amount)
			VALUES ($1, $2, $3)
			RETURNING id, recipe_id, product_id, amount;
		`, [recipeId, productId, amount]);
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
