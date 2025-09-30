import { enVars } from "../config/env"
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model"
import bcryptjs from "bcryptjs"

export const seedSuperAdmin = async() => {
    try{
        const isSuperAdminExist = await User.findOne({email: enVars.SUPER_ADMIN_EMAIL})

        if(isSuperAdminExist){
            console.log("Super admin already exists")

            return;
        }

        console.log("Trying to create super admin...")

        const hashedPassword = await bcryptjs.hash(enVars.SUPER_ADMIN_PASSWORD, Number(enVars.BCRYPT_SALT_ROUND))

        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: enVars.SUPER_ADMIN_EMAIL
        }

        const payload: IUser = {
            name: "Super admin",
            role: Role.SUPER_ADMIN,
            email: enVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            auths : [authProvider],
            isVerified: true,
        }

       

        const superAdmin = await User.create(payload)
        console.log("Super admin created successfully! /n")
        console.log(superAdmin)
    }catch(err){
        console.log(err)
    }
}