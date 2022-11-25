import type { NextApiRequest, NextApiResponse } from "next";
import { Product, User } from "../../models";
import { db, seedDatabase } from "./../../database";

type Data = {
	message: string;
	errorMessage?: string,
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

		await User.deleteMany();
		await User.insertMany(seedDatabase.initialData.users)

		await Product.deleteMany();
		await Product.insertMany(seedDatabase.initialData.products);

		await db.disconnect();
	} catch (error) {
		const errorMessage = JSON.stringify(error)
		res.status(401).json({
			message: "Something went wrong trying to connect with the database",
			errorMessage,
		});
	}

	res.status(200).json({
		message: "SeedData intert into the DataBase successfully",
	});
}
