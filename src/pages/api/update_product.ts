// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const id = req.query['id'];
	const name = req.query['name'];
	const unit = req.query['unit'];
	const x1000 = req.query['x1000'] ?? '';
	if (!id || !name || !unit) {
		res.status(401).json({
			ok: false,
			error: 'id, name and unit are required;'
		});
	}

	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (update_product)');

	try {
		await client.connect();
		await client.query(`
			UPDATE products
			SET
				name=$2,
				unit=$3,
				x1000=$4
			WHERE id=$1;
		`, [id, name, unit, x1000]);
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
