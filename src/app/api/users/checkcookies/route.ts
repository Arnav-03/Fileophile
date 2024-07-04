import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload for type assertion

export async function POST(request: NextRequest) {
  try {
    const cookies = request.cookies;

    const token = cookies.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 });
    }

    const decodedToken = jwt.decode(token.value) as JwtPayload; // Assert type as JwtPayload

    if (!decodedToken) {
      return NextResponse.json({ error: 'Failed to decode token' }, { status: 500 });
    }

    // Access email and username properties from decodedToken safely
    const { email, username } = decodedToken;

    return NextResponse.json({ email, username });
  } catch (error: any) {
    console.error('Error in POST request:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
