import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getOptionalSession } from "@/lib/auth/dal";

const MAX_SIZE_BYTES = 15 * 1024 * 1024;

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getOptionalSession();
  if (!session?.userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Ficheiro em falta." }, { status: 400 });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { error: "A imagem é demasiado grande." },
      { status: 400 },
    );
  }

  try {
    const blob = await put(`recibos/${Date.now()}-${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type || "image/webp",
    });

    return NextResponse.json({ url: blob.url, pathname: blob.pathname });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro no upload." },
      { status: 400 },
    );
  }
}
