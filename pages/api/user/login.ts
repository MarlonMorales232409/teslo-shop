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
        case "POST":
            return loginUser(request, response)
            
    
        default:
            return response.status(400).json({message: 'bad request'})
    }

} 

const loginUser = async (request: NextApiRequest, response: NextApiResponse<any>) => {
    const { email = '', password = '' } =  request.body;

    await db.connect();
    const user = await User.findOne({email});
    await db.disconnect()

    if(!user) return response.status(400).json('Email or Password does not exist - Email')

    if( !bcrypt.compareSync(password, user.password!) ) 
        return response.status(400).json('Email or Password does not exist - Password')


    const { name, role, _id } = user    

    const token = jwt.signToken(_id, email)

    return response.status(200).json({
        token,
        user: {
            name, email, role
        }
    })

}
