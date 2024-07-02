import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../dbconnect/dbconfig';
import User from '../../models/userModel';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email,image } = reqBody;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                message: "User already exists ",
            });
        }

     /*    // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt); */

        // Create new user
        const newUser = new User({
            username,
            email,
            password:"hehe",
        });
        console.log(newUser);
        // Save user to DB
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        });
    } catch (error: any) {
        console.error("Signup failed:", error.message);
        return NextResponse.json({ error: "Signup failed", details: error.message }, { status: 500 });
    }
}
