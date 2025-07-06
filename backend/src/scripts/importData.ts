import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { db } from "../lib/db";
import * as schema from "../drizzle/schema";

// Ordered list of table names (matching .csv filenames)
const importOrder = [
  "location",
  "role",
  "staff",
  "location_staff",
  "recipe",
  "unit",
  "ingredient",
  "stock",
  "recipe_ingredient",
  "modifier_type",
  "modifier",
  "menu",
];

// Path to data directory (relative to /backend)
const baseDir = path.resolve("data");

// Get optional table name argument from command line
const tableArg = process.argv[2];  // e.g. node importData.ts staff

async function importCsv(tableName: string, filePath: string) {
  const table = (schema as any)[tableName];

  if (!table) {
    console.error(`❌ Table "${tableName}" not found in schema.`);
    return;
  }

  const results: any[] = [];

  function isIntegerColumn(col: any) {
    return col && col.dataType === "number";
  }

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
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
            console.info(`Inserting into "${tableName}":`, row);
            await db.insert(table).values(row);
          }
          console.log(`✅ Imported ${results.length} rows into "${tableName}".`);
          resolve();
        } catch (err) {
          console.error(`❌ Failed to import into "${tableName}":`, err);
          reject(err);
        }
      });
  });
}

async function runAllImports() {
  if (tableArg) {
    // Import only the specified table
    if (!importOrder.includes(tableArg)) {
      console.error(`❌ Table "${tableArg}" is not in the import list.`);
      process.exit(1);
    }
    const csvPath = path.join(baseDir, `${tableArg}.csv`);
    console.log(`\n📥 Importing single table: ${tableArg} from ${csvPath}`);
    await importCsv(tableArg, csvPath);
  } else {
    // Import all tables in order
    for (const tableName of importOrder) {
      const csvPath = path.join(baseDir, `${tableName}.csv`);
      console.log(`\n📥 Importing: ${tableName} from ${csvPath}`);
      await importCsv(tableName, csvPath);
    }
  }

  console.log("\n🎉 Import completed.");
}

runAllImports().catch((err) => {
  console.error("🚨 Import process failed:", err);
  process.exit(1);
});
