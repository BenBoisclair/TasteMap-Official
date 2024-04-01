import { authMiddleware } from "@clerk/nextjs/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "../i18nConfig";
import { NextRequest } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/(.*)",
    "/api/webhooks/users",
    "/api/market(.*)",
    "/api/vendor(.*)",
  ],
});

// export function middleware(request: NextRequest) {
//   return i18nRouter(request, i18nConfig);
// }

export const config = {
  matcher: [
    /*
     * Match request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     *
     * This includes images, and requests from TRPC.
     */
    "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)",
  ],
};
