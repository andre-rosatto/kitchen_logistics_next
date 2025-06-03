// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const ingredientId = req.query['ingredientId'];
	const productId = req.query['productId'];
	if (!ingredientId || !productId) {
		res.status(401).json({
			ok: false,
			error: 'ingredientId and productId are required;'
		});
	}

	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (update_product_in_recipe)');

	try {
		await client.connect();
		await client.query(`
			UPDATE recipes_products
			SET product_id=$2
			WHERE id=$1;
		`, [ingredientId, productId]);
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
