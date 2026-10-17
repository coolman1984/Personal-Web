import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types";

/** رد موحّد قبل ما أي عميل خارجي يتفتح. */
export function unavailable(message: string) {
  return NextResponse.json<ApiResponse>(
    { ok: false, message },
    { status: 503, headers: { "cache-control": "no-store" } },
  );
}
