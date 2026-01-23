import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        // logic building to connect to mongodb
        // setp 1. connection string
        // steo 2. use mongoose to connect
        // step 3. print success message
        // step 4. catch the error and print the error message
        // step 5. exit the process if db connection fails
        
        const connectObejct = await mongoose.connect(process.env.MONGODB_URL);

        console.log(`MongoDB connected Successfully`);
        
        console.log("Connected to Host:",connectObejct.connection.host);

    } catch (error) {
        
        console.error("Error connecting to MongoDB:", error.message);

        // agr database se connection na ho paye to server ko band kar dena chahiye
        process.exit(1);
    }
}

export default connectDB;