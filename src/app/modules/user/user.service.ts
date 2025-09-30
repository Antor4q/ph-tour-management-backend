
import AppError from "../../errorHelpers/appError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import { enVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";


const updateUser = async(userId:string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    const isUserExist = await User.findById(userId);

    if(!isUserExist){
        throw new AppError(httStatus.NOT_FOUND, "User Not Found")
    }

   


    /**
     * email - can not update
     * name, phone, password, address
     * only admin, superAdmin - role, isDeleted
     * */ 
   
    if(payload.role){
        if(decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE){
            throw new AppError(httStatus.FORBIDDEN,"Your are not authorized");
        }
        if(payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN){
            throw new AppError(httStatus.FORBIDDEN,"Your are not authorized");
        }
    }

    if(payload.isActive || payload.isDeleted || payload.isVerified){
         if(decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE){
            throw new AppError(httStatus.FORBIDDEN,"Your are not authorized");
        }
    }


    if(payload.password){
        payload.password = await bcryptjs.hash(payload.password, enVars.BCRYPT_SALT_ROUND)
    }
 
    const updateUser = await User.findByIdAndUpdate(userId, payload, {new: true, runValidators: true})

    return updateUser

}

const createUser = async(payload: Partial<IUser>) =>{

     const {email, password, ...rest} = payload;


    //  27.3
     const isUserExist = await User.findOne({email})

     if(isUserExist){
        throw new AppError(httStatus.BAD_REQUEST, "User already exist.")
     }

    //  27.4
    const hashedPassword = await bcryptjs.hash(password as string, Number(enVars.BCRYPT_SALT_ROUND))
    //  27.4 end

     const authProvider: IAuthProvider = {provider: "credentials", providerId: email as string}
    //  27.3 END
     const user = await User.create({
       
        email,
        password: hashedPassword,
        auths: [authProvider],
      ...rest
     })

     return user
}

const getAllUsers = async() => {
    const users = await User.find({});
    const totalUsers = await User.countDocuments()
    return {
        data:users,
        meta: {total:totalUsers}
    }
}


export const UserServices = {
    createUser,
    getAllUsers,
    updateUser
}