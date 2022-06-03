import {NextFunction, Request, Response} from "express";
import {UserModel} from "./userModel";
const userModel = new UserModel()
export const auth = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        res.status(403).send({
            message: "Unauthorized"
        })
        return;
    }

    if (req.headers.authorization !== "abc123") {
        res.status(403).send({
            message: "Unauthorized"
        })
        return;
    }

    next();
}