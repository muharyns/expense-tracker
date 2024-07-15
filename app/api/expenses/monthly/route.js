// app/api/expenses/monthly/route.js
import { NextResponse } from "next/server";
import { db } from "../../../../utils/dbConfig";
import { Expenses } from "../../../../utils/schema";
import { sql } from "drizzle-orm";

// Get expenses per month
export async function GET() {
  try {
    const result = await db
      .select({
        month: sql`DATE_FORMAT(${Expenses.createdAt}, '%Y-%m')`,
        totalAmount: sql`SUM(${Expenses.amount})`,
      })
      .from(Expenses)
      .groupBy(sql`DATE_FORMAT(${Expenses.createdAt}, '%Y-%m')`);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
