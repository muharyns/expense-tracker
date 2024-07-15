// utils/authMiddleware.js
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export function authMiddleware(handler) {
  return async (req) => {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    req.userId = userId; // Attach userId to the request object

    return handler(req);
  };
}
