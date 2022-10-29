import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../models";
import { db, seedDatabase } from "./../../database";

type Data = {
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	// Check if we are running in production

	if (process.env.NODE_ENV === "production") {
		res.status(401).json({ message: "Endpoint does not exist" });
	}

	try {
		await db.connect();

		await Product.deleteMany();
		await Product.insertMany(seedDatabase.initialData.products);

		await db.disconnect();
	} catch (error) {
		res.status(401).json({
			message: "Something went wrong trying to connect with the database",
		});
	}

	res.status(200).json({
		message: "SeedData intert into the DataBase successfully",
	});
}
