import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs"
import { jwt, validation } from "../../../utils";


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

export default function handler(request: NextApiRequest, response: NextApiResponse<Data>){

    switch (request.method) {
        case "POST":
            return registerUser(request, response)
            
    
        default:
            return response.status(400).json({message: 'bad request'})
    }

} 

const registerUser = async (request: NextApiRequest, response: NextApiResponse<any>) => {

    
    const { email = '', password = '', name = '' } =  request.body as {email: string, password: string, name: string};

    if(!validation.isValidEmail(email)) return response.status(400).json({message: 'Email not valid'})
    
    if(password.length < 6) return response.status(400).json({message: 'Password must to be more long than 6 characters'})
    
    if(name.length < 2) return response.status(400).json({message: 'Name must to be more long than 2 characters'})
    


    await db.connect();
    const user = await User.findOne({email});

    if(user) return response.status(400).json({message: 'This Email is already in use'})
    
    const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password),
        role: 'client'
    })

    await db.disconnect()

    try {
        await newUser.save({validateBeforeSave: true})
    } catch (error) {
        console.log(error)
        response.status(500).json({message: 'fail to validate the new user'})
    }




    const { role, _id } = newUser    

    const token = jwt.signToken(_id, email)

    return response.status(200).json({
        token,
        user: {
            name, email, role
        }
    })

}
