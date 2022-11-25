export interface IUser {
    _id: string;
    name: String,
    email: String,
    password?: String,
    role: String,
    createAt?: string;
	updatedAt?: string;
}