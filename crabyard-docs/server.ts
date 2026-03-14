import { file, serve } from "bun";

serve({
  port: parseInt(process.env.PORT || "3000"),
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;

    const exact = file(`./dist${path}`);
    if (await exact.exists()) return new Response(exact);

    const withHtml = file(`./dist${path}.html`);
    if (await withHtml.exists()) return new Response(withHtml);

    const dirIndex = file(`./dist${path}/index.html`);
    if (await dirIndex.exists()) return new Response(dirIndex);

    const notFound = file("./dist/404.html");
    if (await notFound.exists()) return new Response(notFound, { status: 404 });
    return new Response("Not Found", { status: 404 });
  },
});
