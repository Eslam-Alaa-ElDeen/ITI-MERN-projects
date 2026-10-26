import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import  mongoose  from "mongoose";
import { DBURI } from "../../config/config.service.js";



export const connectionDB=async()=>{
    try {
        await mongoose.connect(DBURI);
        console.log("DB connected successfully 💯");
    } catch (error) {
        console.log(error.message,"DB connection failed  ❌");
    }
}

