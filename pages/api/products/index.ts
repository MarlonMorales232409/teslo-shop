import { SHOP_CONSTANTS } from "./../../../database/constants";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "./../../../database/";
import { IProduct } from "../../../interfaces";
import { Product } from "../../../models";

type Data = { message: string } | IProduct[];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			getProducts(req, res);
			break;

		default:
			break;
	}
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	let condition = {};

	const { gender = "all" } = req.query;

	if (gender !== "all" && SHOP_CONSTANTS.validGender.includes(`${gender}`)) {
		condition = { gender };
	}

	try {
		await db.connect();

		const products = await Product.find(condition)
			.select("title images price inStock slug gender -_id")
			.lean();

		await db.disconnect();

		res.status(200).json(products);
	} catch (error) {
		res.status(401).json({ message: `${error}` });
	}
};
