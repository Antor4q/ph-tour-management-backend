import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/appError";
import { enVars } from "../config/env";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = (...authRoles: string[]) =>  async(req:Request,res:Response,next:NextFunction)=>{
    
    try{

     const accessToken = req.headers.authorization;

     if(!accessToken){
        throw new AppError(403, "No Token Received")
     }

     const verifiedToken  = verifyToken(accessToken, enVars.JWT_ACCESS_SECRET) as JwtPayload
 
     if(!authRoles.includes(verifiedToken.role)){
        throw new AppError(403, " Your are not permitted to view this route")
     }

     req.user = verifiedToken
    
     next()

    }catch(err){
        next(err)
    }


}