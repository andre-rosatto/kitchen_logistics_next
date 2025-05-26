// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (meals)');

	try {
		await client.connect();
		const data = await client.query(`
			SELECT id, amount, day
			FROM meals;
		`);
		const result = data.rows.map(meal => ({
			id: meal.id,
			amount: meal.amount,
			day: meal.day,
		}));
		res.status(200).json({
			ok: true,
			data: result,
		});
	} catch (e) {
		res.status(401).json({
			ok: false,
			error: `Connection error: ${e}`
		});
	}
}
