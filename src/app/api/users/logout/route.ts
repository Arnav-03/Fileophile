import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload for type assertion

export async function POST(request: NextRequest) {
    try {
        const response = NextResponse.json({
          message: "Logout successful",
          success: true,
        });
        response.cookies.set("token", "", {
          httpOnly: true,
          expires: new Date(0), // Set the expiration date to the past to remove the cookie
        });
        return response;
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }