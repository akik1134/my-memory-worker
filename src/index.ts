export default {
  async fetch(request: Request) {
    return new Response(
      JSON.stringify({
        ok: true,
        message: "worker is alive",
        path: new URL(request.url).pathname,
        time: new Date().toISOString()
      }),
      {
        headers: { "content-type": "application/json" }
      }
    );
  }
};
