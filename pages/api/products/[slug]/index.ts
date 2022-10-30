import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Product } from "../../../../models";
import { IProduct } from "../../../../interfaces";

type Data = { message: string } | IProduct;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return getProductBySlug(req, res);

		default:
			return res.status(400).json({ message: "bad request" });
	}
}

const getProductBySlug = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	try {
		await db.connect();
		const { slug } = req.query;
		const product = await Product.findOne({ slug }).lean();
		await db.disconnect();

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ message: "bad request" });
	}
};
