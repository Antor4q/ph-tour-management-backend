import express, { Request, Response } from "express"
import cors from "cors"
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFount from "./app/middlewares/notFound";
import cookieParser from "cookie-parser"



const app = express();

// cookieParser video 28.3
app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use("/api/v1",router)

app.get("/", (req:Request, res:Response)=>{
    res.status(200).json({
        message: "Welcome to tour management system"
    })
})



app.use(globalErrorHandler)
// not found route
app.use(notFount)

export default app;