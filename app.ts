import cors from "cors";
import express from "express";
import mysql from "mysql2/promise";
import swaggerUI from "swagger-ui-express";
import { Database } from "./config/Database";
import routes from "./routes/routes";
import swaggerSpec from "./swagger";

const swaggerUIOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
};

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

    app.use(
      "/api-docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerSpec, swaggerUIOptions)
    );

    app.get("/swagger.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });

    const PORT = 3001;
    const swaggerUrl = `http://localhost:${PORT}/api-docs`;

    app.listen(PORT, async () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Swagger UI available at ${swaggerUrl}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

main();
