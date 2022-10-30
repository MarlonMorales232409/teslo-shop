import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct } from "../../../interfaces";
import { Product } from "../../../models";

type Data = { message: string } | IProduct[];

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return searchProduct(req, res);

		default:
			return res.status(400).json({ message: "bad request" });
	}
}

const searchProduct = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	let { q = "" } = req.query;

	if (q.length <= 0)
		return res
			.status(400)
			.json({ message: "Bad Request, you must to send a query" });

	try {
		q = q.toString().toLowerCase();

		await db.connect();
		const product = await Product.find({ $text: { $search: q } })
			.select("title images price inStock slug -_id")
			.lean();
		await db.disconnect();

		res.status(200).json(product);
	} catch (error) {
		return res.status(400).json({ message: `${error}` });
	}
};
