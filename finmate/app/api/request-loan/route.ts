import { NextResponse } from "next/server";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function POST(request: Request) {
  try {
    // Get request body
    const { amount, reason, userId } = await request.json();

    // Validate input
    if (!amount || !reason || !userId) {
      return NextResponse.json(
        { message: "Amount, reason and userId are required" },
        { status: 400 }
      );
    }

    if (amount < 1000 || amount > 50000) {
      return NextResponse.json(
        { message: "Amount must be between ₹1,000 and ₹50,000" },
        { status: 400 }
      );
    }

    // Open SQLite database connection
    const db = await open({
      filename: './finmate.db',
      driver: sqlite3.Database
    });

    // Insert loan request
    const result = await db.run(
      `INSERT INTO loan_requests (user_id, amount, reason, status, created_at) 
       VALUES (?, ?, ?, ?, ?)`,
      [userId, amount, reason, 'PENDING', new Date().toISOString()]
    );

    await db.close();

    return NextResponse.json({
      message: "Loan request submitted successfully",
      data: {
        id: result.lastID,
        userId,
        amount,
        reason,
        status: 'PENDING'
      }
    });

  } catch (error) {
    console.error("Loan request error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
