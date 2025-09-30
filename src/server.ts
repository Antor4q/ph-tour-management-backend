/* eslint-disable no-console */
import {Server} from "http"

import mongoose from "mongoose";
import app from "./app";
import { enVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server:Server;



const startServer = async() => {
  try{
    await mongoose.connect(enVars.DB_URL)
    console.log("connected to DB!!")


    server= app.listen(enVars.PORT, ()=> {
      console.log(`Server is listening to port ${enVars.PORT}`)
     })
  }catch(error){
    console.log(error)
//    
  }
}

(async() => {
    await startServer();
    await seedSuperAdmin()
})()


process.on("unhandledRejection",(err)=> {
    console.log("Unhandled Rejection detected... Server shutting down..",err)

    if(server){
        server.close(()=>{

            process.exit(1)
        });
    }
    process.exit(1)
})
process.on("uncaughtException",(err)=> {
    console.log("Uncaught Exception detected... Server shutting down..",err)

    if(server){
        server.close(()=>{

            process.exit(1)
        });
    }
    process.exit(1)
})
process.on("SIGTERM",()=> {
    console.log("SIGTERM signal received ?server shutting down..")

    if(server){
        server.close(()=>{

            process.exit(1)
        });
    }
    process.exit(1)
})
process.on("SIGINT",()=> {
    console.log("SIGINT signal received ?server shutting down..")

    if(server){
        server.close(()=>{

            process.exit(1)
        });
    }
    process.exit(1)
})

// unhandled rejection err
// Promise.reject(new Error("I forgot to catch this promise"))
// uncaught exception err
// throw new Error("I forgot to handle this local error")

/**
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 * */ 


