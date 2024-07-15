import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "../../../utils/dbConfig";

import { Expenses } from "../../../utils/schema";

import { getAuth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { authMiddleware } from "../../../utils/authMiddleware";
import { capitalizeFirstLetter } from "@/lib/utils";

export async function GET(req) {
  try {
    // Assuming user is fetched from request headers or some auth middleware
    //const user = req.headers.get("user"); // Adjust this based on your auth setup

    // if (!user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // const result = await db
    //   .select({
    //     id: Expenses.id,
    //     name: Expenses.name,
    //     amount: Expenses.amount,
    //     icon: Expenses.icon,
    //     createdBy: Expenses.createdBy,
    //     createdAt: Expenses.createdAt,
    //     // totalSpend: sql`SUM(${Expenses.amount})`.as("totalSpend"),
    //     //totalItem: sql`COUNT(${Expenses.id})`.as("totalItem"),
    //   })
    //   .from(Expenses)
    //   //   .leftJoin(Expenses, eq(Expenses.id, Expenses.budgetId))
    //   .where(eq(Expenses.createdBy, userId));
    //   .groupBy(Expenses.id)
    //   .orderBy(desc(Expenses.id));

    //    const allExpenses = await db.select().from(Expenses).execute();

    const result = await db
      .select("")
      .from(Expenses)
      .where(eq(Expenses.createdBy, userId));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching budget list:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}

export const POST = authMiddleware(async (req) => {
  try {
    const { userId } = req; // userId attached by authMiddleware
    const { name, amount, emojiIcon, category, createdAt } = await req.json();
    const formattedCreatedAt = createdAt;
    const formattedCategory = capitalizeFirstLetter(category);
    // Validate the input
    if (!name || !amount) {
      return NextResponse.json(
        { error: "Name and amount are required" },
        { status: 400 }
      );
    }

    // Insert the new budget
    const result = await db.insert(Expenses).values({
      name,
      amount,
      icon: emojiIcon || null,
      category: formattedCategory,
      createdBy: userId,
      createdAt,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error creating budget:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error },
      { status: 500 }
    );
  }
});
