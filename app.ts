import express = require("express")
import cors = require("cors")
import {Application, json} from "express";
import {userRoutes} from "./userRoute";
import {auth} from "./auth";
const app: Application = express()
app.use(cors())
app.use(json())
app.listen(3000, () =>{
    console.log('Connected')
})

app.use("/bdj", auth,userRoutes);



