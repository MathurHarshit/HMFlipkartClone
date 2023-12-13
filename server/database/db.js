import mongoose from "mongoose";
import 'dotenv/config';
async function Connection(){
    const URL=process.env.DB_URL;
    try {
        await mongoose.connect(URL);
        console.log("Database Connected Successfully");
        
    } catch (error) {
        console.log("Error while connecting with the database",error.message);
    }
}

export default Connection;