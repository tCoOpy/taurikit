import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Env } from "./types";
import { licenseRoutes } from "./routes/license";
import { templateRoutes } from "./routes/template";
import { stripeRoutes } from "./routes/stripe";

const app = new Hono<{ Bindings: Env }>();

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

export default app;
