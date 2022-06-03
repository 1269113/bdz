import {Router} from "express";
import {createUser, deleteUser, getEnd, getStart, View, Buy, getList, deleteRecord} from "./userController";


export const userRoutes = Router();
userRoutes.post("/start", getStart);
//userRoutes.post("/all", getAllList);
userRoutes.post("/list", getList);
userRoutes.post("/create", createUser);
userRoutes.get("/delete/:id", deleteUser);
userRoutes.post("/deleteRecord", deleteRecord);
userRoutes.get("/end/:name", getEnd);
userRoutes.get("/view/:name,:name2", View);
userRoutes.post("/buy", Buy);

