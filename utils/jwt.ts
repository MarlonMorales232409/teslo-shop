import jwt from "jsonwebtoken"

export const signToken = (id: string, email: string)=> {
    if(!process.env.JWT_SECRET_SEED) {
         throw new Error("Error loading secret seed, check envirioment variables")
    }

    return jwt.sign(
        { id, email },
        process.env.JWT_SECRET_SEED,
        { expiresIn: '30d' }
    )
}


export const isValidToken = (token: string):Promise<string> => {

    if(!process.env.JWT_SECRET_SEED) {
        throw new Error("Error loading secret seed, check envirioment variables")
   }

   return new Promise( (resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || "", (err, payload) => {
                if(err) return reject("JWT not valid")

                const { id } = payload as {id: string};

                resolve(id)
            })
            
        } catch (error) {
            reject("JWT not valid")   
        }
   } )
}