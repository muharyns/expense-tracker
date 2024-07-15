import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "../../../../utils/dbConfig";

import { Expenses } from "../../../../utils/schema";
import { capitalizeFirstLetter } from "@/lib/utils";
import { getAuth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { authMiddleware } from "../../../../utils/authMiddleware";

export async function PUT(req, { params }) {
  const { id } = params;

  const { userId } = getAuth(req);

  //return;
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const { name, amount, category, createdAt, icon } = await req.json();
    // const formattedCreatedAt = new Date(createdAt).toISOString().slice(0, 10);
    const formattedCategory = capitalizeFirstLetter(category);
    const updatedExpense = {
      name,
      amount,
      category: formattedCategory,
      createdAt,
      icon,
    };

    const result = await db
      .update(Expenses)
      .set(updatedExpense)
      //.where(Expenses.id.equals(id))
      .where(eq(Expenses.id, id))
      .execute();

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "Expense not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ success: true, data: updatedExpense }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating expense:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
export async function DELETE(req, { params }) {
  const { id } = params;
  const { userId } = getAuth(req);

  //return;
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  if (!id) {
    return NextResponse.json(
      { error: "Expense ID is required" },
      { status: 400 }
    );
  }

  try {
    await db.delete(Expenses).where(eq(Expenses.id, id)).execute();
    return NextResponse.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
