import {Response, Request} from "express";
import {UserModel} from "./userModel";
import {User} from "./userModel";


const userModel = new UserModel()

export const getStart = async (request: Request, response: Response) => {
    let start = await new UserModel().getStart()
    response.send(start)
}
export const getEnd = async (request: Request, response: Response) => {
    const name:string = request.params.name || "null";
    let end = await new UserModel().getEnd(name);
    response.send(end)
}

export const View = async (request: Request, response: Response) => {
    const name:string = request.params.name || "null";
    const name2: string = request.params.name2  || "null";
    let view = await new UserModel().View(name, name2)
    response.send(view)
}

export const Buy = async (request: Request, response: Response) => {
    const user: string = request.body.username;
    const name2: number = request.body.ticketID  || 0;
    let buy = await new UserModel().Buy(user, name2)
    console.log(request.body.username)
    response.send(buy)
}

export const createUser = async (request: Request, response: Response) => {
    try{
        let userData: User = request.body;
        const userModel = new UserModel();
        await userModel.createUser(userData)
        response.send({
            message: "Success"
        })
    } catch (e){
        response.status(403).send({
            message: "User create is not successful"
        })
    }
}
export const deleteUser = async (request: Request, response: Response) => {
    const id = Number(request.params.id)
    const userModel = new UserModel()
    await userModel.deleteUser(id)
    response.send({
        status: 200,
        message: `User ID=${id} was deleted successfully`
    })
}
export const deleteRecord = async (request: Request, response: Response) => {
    //const id: number = +request.params.id
    const id: number = request.body.ticketID;
    const del = await new UserModel().deleteRecord(id)
    response.send(del)
}

export const getList = async (request: Request, response: Response) => {
    const user: string = request.body.username;
    let list = await new UserModel().getList(user)
    response.send(list)
}