/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
// import { UserServices } from "../user/user.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.service"

const credentialsLogin = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
     
      const loginInfo = await AuthServices.credentialsLogin(req.body)

        // sendResponse file for repeated komano
        sendResponse(res,{
            statusCode: httpStatus.OK,
            message:"User Logged In Successfully",
            data: loginInfo,
            success: true
        })
})

export const AuthControllers= {
    credentialsLogin,
}