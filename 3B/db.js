import mongoose from "mongoose";

const connection = mongoose.connect("mongodb://localhost:27017/prac3b");
console.log("Mongo connection completed");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export const user = mongoose.model("User", userSchema);
