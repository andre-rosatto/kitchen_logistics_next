// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const ingredientId = req.query['ingredientId'];
	if (!ingredientId) {
		res.status(401).json({
			ok: false,
			error: 'ingredientId is required;'
		});
	}

	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (delete_product_from_recipe)');

	try {
		await client.connect();
		await client.query(`
			DELETE FROM recipes_products
			WHERE id=$1;
		`, [ingredientId]);
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
