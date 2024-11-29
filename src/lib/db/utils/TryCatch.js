import { NextResponse } from "next/server";

/**
 *
 * @param {Function} next
 * @returns {Function}
 */
export default function TryCatch(next) {
  return async (ele) => {
    try {
      return await next(ele);
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  };
}
