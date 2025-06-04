import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const id = req.query['id'];
	if (!id) {
		res.status(401).json({
			ok: false,
			error: 'id is required;'
		});
	}

	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (delete_meal)');

	try {
		await client.connect();
		await client.query(`
			DELETE FROM meals_recipes
			WHERE id=$1;
		`, [id]);
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
