import { NextResponse } from "next/server";

export default function TryCatch(next) {
  return async (ele) => {
    try {
      return await next(ele);
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  };
}
