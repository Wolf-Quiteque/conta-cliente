import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getOptionalSession } from "@/lib/auth/dal";

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getOptionalSession();
  if (!session?.userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ["image/webp", "image/jpeg", "image/png"],
          addRandomSuffix: true,
          maximumSizeInBytes: 15 * 1024 * 1024,
          tokenPayload: JSON.stringify({ userId: session.userId }),
        };
      },
      onUploadCompleted: async () => {
        // The receipt record is created explicitly by the client after upload
        // (via createReceipt), so the user's entered date/amount are captured
        // in the same step. Nothing to do here.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro no upload." },
      { status: 400 },
    );
  }
}
