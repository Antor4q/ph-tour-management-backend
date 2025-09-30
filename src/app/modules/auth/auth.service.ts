import AppError from "../../errorHelpers/appError";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import { generateToken } from "../../utils/jwt";
import { enVars } from "../../config/env";

const credentialsLogin = async(payload: Partial<IUser>) => {
 const {email, password} = payload;
 const isUserExist = await User.findOne({email})

 if(!isUserExist){
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
 }

 const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)
 
 if(!isPasswordMatched){
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
 }
 

//  27.6 jwt

const jwtPayload = {
   userId: isUserExist._id,
   email: isUserExist.email,
   role: isUserExist.role
}

console.log(jwtPayload,"from 32")

const accessToken = generateToken(jwtPayload, enVars.JWT_ACCESS_SECRET, enVars.JWT_ACCESS_EXPIRES)

 return {
    accessToken
 }

}

export const AuthServices= {
    credentialsLogin,
}