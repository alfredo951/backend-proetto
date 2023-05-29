import { NextFunction, Request, Response } from "express";

import * as jwt from 'jsonwebtoken';
import { JwtPayload } from "jsonwebtoken";



declare global{ namespace Express {
    export interface Request {
       userExist: JwtPayload | string
    }
}
 }


const verifyToken=(req:Request,res:Response,next:NextFunction)=>{

    let token:number | string |undefined=req.headers['authorization'];

    if(!token){
       return res.status(403).json({message:"token is required"})
    }

    try {    token = token.replace(/^Bearer\s+/, "");
   jwt.verify(token, 'iaffioComanda', (err,_ ) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
    else return next();
        });

    

    
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:"invalid Token"})
    }

    return next();
}

export default verifyToken;