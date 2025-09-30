
/* eslint-disable @typescript-eslint/no-unused-vars */


import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { enVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";


const updateUser =catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const userId = req.params.id;
    // const token = req.headers.authorization
    // const verifiedToken = verifyToken(token as string, enVars.JWT_ACCESS_SECRET) as JwtPayload
    const verifiedToken = req.user;
    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken)

        // sendResponse file for repeated komano
        sendResponse(res,{
            statusCode: httpStatus.CREATED,
            message:"User Updated Successfully",
            data: user,
            success: true
        })
})
const createUser =catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user = await UserServices.createUser(req.body)

        // res.status(httpStatus.CREATED).json({
        //     message: "User Created Successfully",
        //     user
        // })


        // sendResponse file for repeated komano
        sendResponse(res,{
            statusCode: httpStatus.CREATED,
            message:"User Created Successfully",
            data: user,
            success: true
        })
})


// const createUser = async(req:Request, res: Response,next:NextFunction)=> {
//     try{
        
//         const user = await UserServices.createUser(req.body)

//         res.status(httpStatus.CREATED).json({
//             message: "User Created Successfully",
//             user
//         })
//     }catch(err:any){
//         // eslint-disable-next-line no-console
//         console.log(err);
//        next(err)
//     //    global err handler added in app.ts
//     }
// }


// const getAllUsers = async(req:Request, res: Response,next:NextFunction) =>{
//  try{
//     const users = await UserServices.getAllUsers()
//     return users
//  }catch(err:any){
//  console.log(err)
//  next(err)
//  }
// }


const getAllUsers = catchAsync(async(req:Request,res:Response,next:NextFunction)=> {
    const result = await UserServices.getAllUsers()
     // sendResponse file for repeated komano
        sendResponse(res,{
            statusCode: httpStatus.OK,
            message:"All Users Retrieved Successfully",
            data: result.data,
            success: true,
            meta: result.meta
        })
})


export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser
}


// route matching => controller => service => model => db