import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
    },
    googleSign: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
