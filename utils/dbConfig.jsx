//import { neon } from "@neondatabase/serverless";
//import { drizzle } from "drizzle-orm/neon-http";
import mysql from "mysql2/promise"; // Import mysql2 for promises
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";

// const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
// export const db = drizzle(sql,{schema});

// // Create a MySQL connection pool
// const pool = mysql.createPool({
//   uri: process.env.NEXT_PUBLIC_DATABASE_URL,
// });

// // Wrap the connection pool with Drizzle ORM
// export const db = drizzle(pool);

// // Export the pool for direct SQL queries if needed
// export { pool };
const pool = mysql.createPool({
  uri: process.env.NEXT_PUBLIC_DATABASE_URL,
});

export const db = drizzle(pool, { schema, mode: "default" });

export { pool };
