import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { db } from "../lib/db";

// Import all schema tables
import * as schema from "../drizzle/schema";

const tableNameArg = process.argv[2]; // e.g. "menu"
const fileArg = process.argv[3];      // e.g. "data/menu.csv"

if (!tableNameArg || !fileArg) {
  console.error("Usage: ts-node importCsv.ts <tableName> <csvPath>");
  process.exit(1);
}

const tableName = tableNameArg;
const csvPath = path.resolve(process.cwd(), fileArg);
const results: any[] = [];

const table = (schema as any)[tableName];

if (!table) {
  console.error(`Table "${tableName}" not found in schema.`);
  process.exit(1);
}

// Helper to detect integer columns (in Postgres it is number type) by checking internal column properties
function isIntegerColumn(col: any) {
  return col && col.dataType === "number";
}

fs.createReadStream(csvPath)
  .pipe(csv())
  .on("data", (data) => {
    // Convert empty strings to null for integer columns
    for (const key in data) {
      if (data[key] === "") {
        const col = table[key];
        if (col && isIntegerColumn(col)) {
          data[key] = null;
        }
      }
    }
    results.push(data);
  })
  .on("end", async () => {
    try {
      for (const row of results) {
        console.info("Inserting row:", row);
        await db.insert(table).values(row);
      }
      console.log(`Imported ${results.length} rows into "${tableName}".`);
    } catch (err) {
      console.error("Import failed:", err);
    }
  });
