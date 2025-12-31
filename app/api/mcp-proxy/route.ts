import https from "https";

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.text();

  const options = {
    hostname: "tictactoe.heyidb.com",
    path: "/mcp",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json, text/event-stream",
      "Content-Length": Buffer.byteLength(body).toString(),
    },
  };

  const result = await new Promise<{ status: number; headers: any; body: string }>((resolve, reject) => {
    const r = https.request(options, (res) => {
      let data = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode || 0, headers: res.headers, body: data }));
    });
    r.on("error", reject);
    r.write(body);
    r.end();
  });

  const headers = new Headers();
  if (result.headers["content-type"]) headers.set("content-type", String(result.headers["content-type"]));

  return new Response(result.body, { status: result.status, headers });
}
