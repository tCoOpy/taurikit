import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import postgres from "postgres";
import type { Env } from "./types";
import { licenseRoutes } from "./routes/license";
import { templateRoutes } from "./routes/template";
import { stripeRoutes } from "./routes/stripe";

const sql = postgres(process.env.DATABASE_URL!);

const app = new Hono<Env>();

app.use("*", async (c, next) => {
  c.set("db", sql);
  await next();
});

app.use(
  "*",
  cors({
    origin: "https://taurikit.dev",
    allowMethods: ["GET", "POST"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/health", (c) => c.json({ ok: true }));

app.route("/license", licenseRoutes);
app.route("/template", templateRoutes);
app.route("/stripe", stripeRoutes);

const port = parseInt(process.env.PORT || "3000", 10);
serve({ fetch: app.fetch, port }, (info) => {
  console.log(`taurikit-api listening on :${info.port}`);
});
