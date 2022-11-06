import { IValidSize, IValidType } from "./";

export interface ICartProduct {
	_id: string;
	inStock: number;
	price: number;
	size: IValidSize;
	slug: string;
	title: string;
	type: IValidType;
	gender: "men" | "women" | "kid" | "unisex";
}
