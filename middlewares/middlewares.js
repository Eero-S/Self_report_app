import { send } from "../deps.js";

const authMiddleware = async ({ request, response, session }, next) => {
  if (
    !(
      request.url.pathname.startsWith("/auth/") ||
      request.url.pathname.startsWith("/static")
    )
  ) {
    if (session && (await session.get("authenticated"))) {
      await next();
    } else {
      response.redirect("/auth/login");
    }
  } else {
    await next();
  }
};

const errorMiddleware = async (context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
};

const requestTimingMiddleware = async ({ request, session }, next) => {
  const user = await session.get("user");
  const authStatus = user ? `userId: ${user.id}` : "anonymous";
  const start = Date.now();
  const today = new Date(start);
  await next();
  const ms = Date.now() - start;
  console.log(
    `${today} ${request.method} ${request.url.pathname} ${authStatus} - ${ms}ms`
  );
};

const serveStaticFilesMiddleware = async (context, next) => {
  if (context.request.url.pathname.startsWith("/static")) {
    const path = context.request.url.pathname.substring(7);

    await send(context, path, {
      root: `${Deno.cwd()}/static`,
    });
  } else {
    await next();
  }
};

export {
  authMiddleware,
  errorMiddleware,
  requestTimingMiddleware,
  serveStaticFilesMiddleware,
};
