// app/api/expenses/category/route.js
import { NextResponse } from "next/server";
import { pool, db } from "../../../../utils/dbConfig";
import { Expenses } from "../../../../utils/schema";
import { sql } from "drizzle-orm";

// Get spending breakdown by category
export async function GET() {
  try {
    const result = await db
      .select({
        category: Expenses.category,
        totalAmount: sql`SUM(${Expenses.amount})`,
      })
      .from(Expenses)
      .groupBy(Expenses.category);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
