import mongoose from "mongoose";
const connectDB = async ()=> {
    mongoose.connection.on('connected', () => console.log("Database connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/predoc`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000,
    })
}
export default connectDB;