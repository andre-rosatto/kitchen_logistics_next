// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const name = req.query['name'];
	if (!name) {
		res.status(401).json({
			ok: false,
			error: 'name is required;'
		});
	}

	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (add_recipe)');

	try {
		await client.connect();
		const data = await client.query(`
			INSERT INTO recipes (name)
			VALUES ($1)
			RETURNING id, name;
		`, [name]);
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
