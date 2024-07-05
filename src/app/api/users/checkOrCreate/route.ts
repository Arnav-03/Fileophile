import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "../../models/userModel";
import { connect } from "../../dbconnect/dbconfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, username } = reqBody;

    // Check if user exists
    let user = await User.findOne({ email });
    let message;
    if (!user) {
      // Create user if not exists
      const newUser = new User({
        username,
        email,
        password: "google",  // Empty password
        googleSign: true,
      });
      user = await newUser.save();
      message="New user created";
    } else {
        message="User exists";
    }

    return NextResponse.json({
      message: user ? message : "Error creating user",
      success: !!user,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
