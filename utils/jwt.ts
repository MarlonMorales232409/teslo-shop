import jwt from "jsonwebtoken"

export const signToken = (id: string, email: string)=> {
    if(!process.env.JWT_SECRET_SEED) {
         throw new Error("Error loading secret seed, check envirioment variables")
    }

    jwt.sign(
        { id, email },
        process.env.JWT_SECRET_SEED,
        { expiresIn: '30d' }
    )
}