export const predefinedCategories = [
  { value: "Housing", label: "Housing" },
  { value: "Food", label: "Food" },
  { value: "Transportation", label: "Transportation" },
  { value: "Utilities", label: "Utilities" },
  { value: "Insurance", label: "Insurance" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Savings", label: "Savings" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Miscellaneous", label: "Miscellaneous" },
];

import {
  mysqlTable,
  decimal,
  varchar,
  int,
  date,
  datetime,
} from "drizzle-orm/mysql-core";

export const Expenses = mysqlTable("expenses", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", 255).notNull(),
  amount: varchar("amount", 255).notNull(),
  icon: varchar("icon", 255),
  category: varchar("category", 255).notNull(),
  createdBy: varchar("createdBy", 255).notNull(),
  createdAt: date("createdAt").notNull(),
});
