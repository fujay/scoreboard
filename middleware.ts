import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // pattern "/((?!api|_next/static|_next/image|.*\\.png$).*)" is used.
  // This pattern matches all routes except those starting with /api, / _next/static, / _next/image, or ending with .png.
  // This ensures that the authentication middleware is applied to all relevant routes while excluding static assets and API routes.
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
