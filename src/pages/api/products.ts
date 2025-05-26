// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (products)');

	try {
		await client.connect();
		const data = await client.query(`
			SELECT id, name, unit, x1000
			FROM products;
		`);
		const result = data.rows.map(product => ({
			id: product.id,
			name: product.name,
			unit: product.unit,
			x1000: product.x1000
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
