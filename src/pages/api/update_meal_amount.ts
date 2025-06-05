import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const id = req.query['id'];
	const amount = req.query['amount'];
	if (!id || !amount) {
		res.status(401).json({
			ok: false,
			error: 'id and amount are required.'
		});
	}

	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (update_meal_amount)');

	try {
		await client.connect();
		await client.query(`
			UPDATE meals
			SET
				amount=$2
			WHERE id=$1;
		`, [id, amount]);
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
