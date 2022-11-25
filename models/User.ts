import mongoose, { Model, model, Schema } from "mongoose";
import { IUser } from "../interfaces";


const userSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    role: {
        type: String,
        enum: {
            values: ["admin", "client"],
            message: "{VALUE} is not a valid role",
            default: "client",
            require: true,
        }
    }
}, {timestamps: true})

const User:Model<IUser> = mongoose.models.User || model("User", userSchema);

export default User