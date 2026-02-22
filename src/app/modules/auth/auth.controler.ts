/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
// import { UserServices } from "../user/user.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.service"
import AppError from "../../errorHelpers/appError"
import { setAuthCookie } from "../../utils/setCookie"

const credentialsLogin = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
     
      const loginInfo = await AuthServices.credentialsLogin(req.body)

    //   res.cookie("accessToken",loginInfo.accessToken, {
    //     httpOnly:true,
    //     secure:false,
    //   }) video 28.4, this added in setAuthCookie
   

    //   must dite hobe 28.3
    //   res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false,
    //   }) commented from video 28.4

     setAuthCookie(res, loginInfo)

        // sendResponse file for repeated komano
        sendResponse(res,{
            statusCode: httpStatus.OK,
            message:"User Logged In Successfully",
            data: loginInfo,
            success: true
        })
})
const getNewAccessToken = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        throw new AppError(httpStatus.BAD_REQUEST, "No refresh token received from cookies")
    }
     
      const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)

    //    res.cookie("accessToken",tokenInfo.accessToken, {
    //     httpOnly:true,
    //     secure:false,
    //   }) commented 28.4
    setAuthCookie(res, tokenInfo)

        // sendResponse file for repeated komano
        sendResponse(res,{
            statusCode: httpStatus.OK,
            message:"User Logged In Successfully",
            data: tokenInfo,
            success: true
        })
})

export const AuthControllers= {
    credentialsLogin,
    getNewAccessToken
}