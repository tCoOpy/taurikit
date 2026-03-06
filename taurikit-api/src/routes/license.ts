import { Hono } from "hono";
import type { Env, License } from "../types";

export const licenseRoutes = new Hono<{ Bindings: Env }>();

licenseRoutes.post("/validate", async (c) => {
  const body = await c.req.json<{ key?: string }>();
  const key = body.key?.trim();

  if (!key) {
    return c.json({ valid: false, message: "Missing license key" }, 400);
  }

  const license = await c.env.DB.prepare(
    "SELECT * FROM licenses WHERE key = ?"
  )
    .bind(key)
    .first<License>();

  if (!license) {
    return c.json({ valid: false, message: "Unknown license key" }, 401);
  }

  if (!license.active) {
    return c.json({ valid: false, message: "License deactivated" }, 403);
  }

  await c.env.DB.prepare(
    "UPDATE licenses SET last_used = datetime('now') WHERE id = ?"
  )
    .bind(license.id)
    .run();

  return c.json({ valid: true, plan: license.plan });
});
