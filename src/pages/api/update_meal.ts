// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const day = req.query['day'];
	const amount = req.query['amount'];
	if (!day || !amount) {
		res.status(401).json({
			ok: false,
			error: 'day and amount are required;'
		});
	}

	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (update_meal)');

	try {
		await client.connect();
		await client.query(`
			UPDATE meals
			SET amount=$2
			WHERE day=$1;
		`, [day, amount]);
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
