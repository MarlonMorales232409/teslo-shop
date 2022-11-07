import { IValidSize, IValidType } from "./";

export interface ICartProduct {
	_id: string;
	image: string;
	price: number;
	size?: IValidSize;
	slug: string;
	title: string;
	gender: "men" | "women" | "kid" | "unisex";
	quantity: number;
}
