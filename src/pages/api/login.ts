import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const email = req.query['email'];
	const password = req.query['password'];

	if (!email || !password) {
		res.status(401).json({
			ok: false,
			error: 'email and password are required.'
		});
	}

	const client = new Pool({ connectionString: process.env.CONNECTION_STRING });
	console.log('connected (login)');

	try {
		await client.connect();
		const user = await client.query(`
			SELECT id
			FROM users
			WHERE email=$1 and password=$2;
		`, [email, password]);

		res.status(200).json({
			ok: user.rowCount && user.rowCount > 0,
		});
	} catch (e) {
		res.status(401).json({
			ok: false,
			error: `Connection error: ${e}`
		});
	}
}
