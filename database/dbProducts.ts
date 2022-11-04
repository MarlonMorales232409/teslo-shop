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

export const getProductsByTerm = async (query: string): Promise<IProduct[]> => {
	query = query.toString().toLowerCase();

	await db.connect();
	const products = await Product.find({ $text: { $search: query } })
		.select("title images price inStock slug -_id")
		.lean();
	await db.disconnect();

	return JSON.parse(JSON.stringify(products));
};

export const getAllProducts = async (query: string): Promise<IProduct[]> => {
	query = query.toString().toLowerCase();
	await db.connect();

	const products = await Product.find({ query }).lean();

	await db.disconnect();

	return JSON.parse(JSON.stringify(products));
};
