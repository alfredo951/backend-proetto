import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            userExist: JwtPayload | string;
        }
    }
}
declare const verifyToken: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export default verifyToken;
