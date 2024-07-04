import {connect} from "../../dbconnect/dbconfig"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import User from "../../models/userModel";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody;
        console.log(reqBody);
    
        //if user already exist
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "user already exists"},{status:400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashdedPassword = await bcryptjs.hash(password,salt)
        
        const newUser= new User({
            username,
            email,
            password: hashdedPassword,
        })
        //save to db
        const savedUser = await newUser.save()
        console.log(savedUser);

        
        return NextResponse.json({
            message: "user created",
            success:true,
            savedUser,
        })

        
    } catch (error: any) {
        return NextResponse.json({error:error.message},
            {status:500})
    }
}