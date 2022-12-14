import mongoose, { Model, model, Schema } from "mongoose";
import { IProduct } from "../interfaces/products";

const productSchema = new Schema(
	{
		description: { type: String, require: true },
		images: [{ type: String }],
		inStock: { type: Number, require: true, defaul: 0 },
		price: { type: Number, require: true },
		sizes: [
			{
				type: String,
				enum: {
					values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
					message: "{VALUE} is not a valid size",
				},
			},
		],
		slug: { type: String, require: true, unique: true },
		tags: [{ type: String }],
		title: { type: String, require: true },
		type: [
			{
				type: String,
				enum: {
					values: ["shirts", "pants", "hoodies", "hats"],
					message: "{VALUE} is not a valid type",
				},
			},
		],
		gender: [
			{
				type: String,
				enum: {
					values: ["men", "women", "kid", "unisex"],
					message: "{VALUE} is not a valid category",
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

productSchema.index({ title: "text", tags: "text" });

const Product: Model<IProduct> =
	mongoose.models.Product || model("Product", productSchema);

export default Product;
