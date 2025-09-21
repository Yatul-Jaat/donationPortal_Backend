import express from "express"
import cookieParser from "cookie-parser";
import Cors from "cors"
import dotenv from "dotenv"

import {router as signUpRouter} from "./routes/Signup.route.js"
import { connectingTODB } from "./db/db.js";
import donnerRouter from "./routes/donner.route.js";
import receiverRouter from "./routes/receiver.route.js";

const app =express();
dotenv.config();

app.use(express.json());
app.use(Cors())
app.use(cookieParser());

app.use("/auth",signUpRouter);
app.use("/donner",donnerRouter);
app.use("/receiver",receiverRouter)



app.listen(process.env.PORT,()=>{
    console.log("connected to server");
    connectingTODB(process.env.MONGO_URI);
})
