// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const id = req.query['id'];
	const name = req.query['name'];
	if (!id || !name) {
		res.status(401).json({
			ok: false,
			error: 'id and name are required;'
		});
	}

	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (update_recipe)');

	try {
		await client.connect();
		await client.query(`
			UPDATE recipes
			SET name=$2
			WHERE id=$1;
		`, [id, name]);
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
