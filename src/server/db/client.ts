import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const dataDir = path.join(process.cwd(), "data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function getDbFileName() {
  switch (process.env.NODE_ENV) {
    case "production":
      return "prod.db";
    case "test":
      return "test.db";
    case "development":
    default:
      return "dev.db";
  }
}

const dbPath = path.join(dataDir, getDbFileName());

declare global {
  var __db__: Database.Database | undefined;
}

export const db =
  global.__db__ ?? new Database(dbPath, { fileMustExist: false });

if (process.env.NODE_ENV !== "production") {
  global.__db__ = db;
}

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.pragma("synchronous = NORMAL");
