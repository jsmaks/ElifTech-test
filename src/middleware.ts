import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublic = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware((request) => {
  const url = new URL(request.url);

  // Redirect root path to /events
  if (url.pathname === "/") {
    return nextjsMiddlewareRedirect(request, "/events");
  }

  if (!isPublic(request) && !isAuthenticatedNextjs()) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }
  if (isPublic(request) && isAuthenticatedNextjs()) {
    return nextjsMiddlewareRedirect(request, "/events?page=1&search=");
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
