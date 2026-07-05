export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);

    // 生存確認
    if (url.pathname === "/") {
      return new Response("WORKER OK", {
        headers: { "content-type": "text/plain" },
      });
    }

    // /tasks 仮レスポンス（D1なしでも動く）
    if (url.pathname === "/tasks") {
      return Response.json({
        success: true,
        message: "tasks endpoint is alive",
        data: [],
      });
    }

    // dummyテスト
    if (url.pathname.startsWith("/dummy/")) {
      const slug = url.pathname.split("/dummy/")[1];

      const body = await request.json().catch(() => ({}));

      return Response.json({
        success: true,
        result: {
          msg: "dummy working",
          slug,
          name: body.name ?? "no-name",
        },
      });
    }

    return new Response("NOT FOUND", { status: 404 });
  },
};
