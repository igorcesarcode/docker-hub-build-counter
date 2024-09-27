import { NextResponse } from "next/server";

export async function GET() {
  const username = process.env.DOCKER_USERNAME;
  const password = process.env.DOCKER_PASSWORD;

  if (!username || !password) {
    return NextResponse.json(
      { error: "Credenciais não configuradas" },
      { status: 400 }
    );
  }

  const basicAuth = Buffer.from(`${username}:${password}`).toString("base64");

  try {
    const tokenResponse = await fetch(
      `https://auth.docker.io/token?service=registry.docker.io&scope=repository%3Aratelimitpreview%2Ftest%3Apull`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { error: "Failed to get token" },
        { status: 401 }
      );
    }

    const { token } = await tokenResponse.json();

    const rateLimit = await fetch(
      "https://registry-1.docker.io/v2/ratelimitpreview/test/manifests/latest",
      {
        method: "HEAD",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!rateLimit.ok) {
      return NextResponse.json(
        { error: "Falha ao obter o limite de taxa" },
        { status: rateLimit.status }
      );
    }

    const remaining = parseInt(
      rateLimit.headers.get("RateLimit-Remaining") || "0",
      10
    );

    const limit = parseInt(rateLimit.headers.get("RateLimit-Limit") || "0", 10);

    return NextResponse.json({ remainingBuilds: { remaining, limit } });
  } catch {
    return NextResponse.json(
      { error: "Erro ao obter o limite de taxa" },
      { status: 401 }
    );
  }
}
