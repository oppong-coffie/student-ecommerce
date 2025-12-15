import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Logout endpoint - clears the session cookie
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  
  // Clear the session cookie
  cookieStore.delete("session-token");

  return NextResponse.json({ message: "Logged out successfully" });
}
