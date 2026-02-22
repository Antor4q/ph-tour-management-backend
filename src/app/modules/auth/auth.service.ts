import AppError from "../../errorHelpers/appError";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import { createNewAccessTokenWRT, createUserTokens } from "../../utils/userToken";
// import { generateToken, verifyToken } from "../../utils/jwt";
// import { enVars } from "../../config/env";
// import { JwtPayload } from "jsonwebtoken";

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

// const jwtPayload = {
//    userId: isUserExist._id,
//    email: isUserExist.email,
//    role: isUserExist.role
// }


// const accessToken = generateToken(jwtPayload, enVars.JWT_ACCESS_SECRET, enVars.JWT_ACCESS_EXPIRES)

// const refreshToken = generateToken(jwtPayload, enVars.JWT_REFRESH_SECRET, enVars.JWT_REFRESH_EXPIRES)

const userTokens = createUserTokens(isUserExist)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {password: pass, ...rest } = isUserExist.toObject()

 return {
    accessToken : userTokens.accessToken,
    refreshToken : userTokens.refreshToken,
    user: rest
 }

}
const getNewAccessToken = async(refreshToken: string) => {
   // added other logics in userToken function video 28.4
 const newAccessToken = await createNewAccessTokenWRT(refreshToken)
 return {
    accessToken : newAccessToken
 }

}

export const AuthServices= {
    credentialsLogin,
    getNewAccessToken
}