import { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	return res.status(400).json({ message: "Error!, endpoint not found" });
}
