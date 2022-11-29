import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs"
import { jwt } from "../../../utils";


type Data = 
| {message: string}
| {
    token: string,
    user: {
        name:   string,
        email:  string,
        role:   string
    }
}

export default function handler(request: NextApiRequest, response: NextApiResponse){

    switch (request.method) {
        case "GET":
            return validateJWT(request, response)
            
    
        default:
            return response.status(400).json({message: 'bad request'})
    }

} 

const validateJWT = async (request: NextApiRequest, response: NextApiResponse<Data>) => {
    const { token = "" } =  request.cookies;

    let userId = "";

    try {
        userId = await jwt.isValidToken(token)
    } catch (error) {
        response.status(401).json({message: "Unauthorize token"})
    }

    await db.connect();
    const user = await User.findById(userId).lean();
    await db.disconnect()

    if(!user) return response.status(400).json({message: 'No user with this ID'})

   
    const { _id, email, name, role } = user    
    
    return response.status(200).json({
        token: jwt.signToken(_id, email),
        user: {
            name, email, role
        }
    })

}
