import { db } from ".";
import { IProduct } from "../interfaces";
import { Product } from "../models";

export const getProductBySlug = async (
	slug: string
): Promise<IProduct | null> => {
	try {
		await db.connect();
		const product = await Product.findOne({ slug }).lean();
		await db.disconnect();

		if (!product) return null;

		return JSON.parse(JSON.stringify(product));
	} catch (error) {
		console.log(error);
		return null;
	}
};

interface ProductSlug {
	slug: string;
}

export const getAllSlugs = async (): Promise<ProductSlug[]> => {
	await db.connect();
	const slugs = await Product.find().select("slug -_id");
	await db.disconnect();

	return slugs;
};
