import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import routes from "./routes/routes";
import { Database } from "./config/Database";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

async function createDatabaseIfNotExists() {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT) || 3306,
    user: DB_USER,
    password: DB_PASS,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  await connection.end();
}

async function main() {
  try {
    await createDatabaseIfNotExists();

    // initialize your singleton DataSource once here
    await Database.initialize();

    app.use("/api", routes);

    app.listen(3001, () => {
      console.log("Server running on http://localhost:3001");
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

main();
