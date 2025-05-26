// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const name = req.query['name'];
	const unit = req.query['unit'];
	const x1000 = req.query['x1000'] ?? '';
	if (!name || !unit) {
		res.status(401).json({
			ok: false,
			error: 'name and unit are required;'
		});
	}

	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (add_product)');

	try {
		await client.connect();
		const data = await client.query(`
			INSERT INTO products (name, unit, x1000)
			VALUES ($1, $2, $3)
			RETURNING id, name, unit, x1000;
		`, [name, unit, x1000]);
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
