import mongoose from "mongoose";

export async function start(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        const connection = await mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit(1);
        })
    } 
    catch (error) {
        console.log(error.message)
    }
}


