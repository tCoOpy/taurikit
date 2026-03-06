import { Hono } from "hono";
import type { Env, License } from "../types";

export const templateRoutes = new Hono<{ Bindings: Env }>();

templateRoutes.get("/:version", async (c) => {
  const authHeader = c.req.header("Authorization");
  const key = authHeader?.replace("Bearer ", "").trim();

  if (!key) {
    return c.json({ error: "Missing license key" }, 401);
  }

  const license = await c.env.DB.prepare(
    "SELECT * FROM licenses WHERE key = ? AND active = 1"
  )
    .bind(key)
    .first<License>();

  if (!license) {
    return c.json({ error: "Invalid or inactive license" }, 403);
  }

  const version = c.req.param("version");
  const objectKey = `templates/${version}.tar.gz`;
  const object = await c.env.TEMPLATES.get(objectKey);

  if (!object) {
    return c.json({ error: `Template version ${version} not found` }, 404);
  }

  return new Response(object.body, {
    headers: {
      "Content-Type": "application/gzip",
      "Content-Disposition": `attachment; filename="taurikit-${version}.tar.gz"`,
    },
  });
});
