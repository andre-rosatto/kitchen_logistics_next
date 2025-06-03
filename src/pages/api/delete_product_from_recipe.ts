// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const recipeId = req.query['recipeId'];
	const productId = req.query['productId'];
	if (!recipeId || !productId) {
		res.status(401).json({
			ok: false,
			error: 'recipeId and productId are required;'
		});
	}

	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (remove_product_from_recipe)');

	try {
		await client.connect();
		await client.query(`
			DELETE FROM recipes_products
			WHERE recipe_id=$1 AND product_id=$2
		`, [recipeId, productId]);
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
