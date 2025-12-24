ashnouruzi@C357PRGCH2 gitwrap % npm run dev

> my-app@0.1.0 dev
> next dev

  ▲ Next.js 14.2.16
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 1013ms
 ○ Compiling /[username] ...
 ✓ Compiled /[username] in 1339ms (1308 modules)
 ✓ Compiled in 75ms (644 modules)
 GET /mine77 200 in 1891ms
 ✓ Compiled /_not-found in 188ms (1297 modules)
 GET /.well-known/appspecific/com.chrome.devtools.json 404 in 266ms
 ○ Compiling /api/user/[username] ...
 ✓ Compiled /api/user/[username] in 641ms (696 modules)
Fetching stats for public user: mine77
Fetching stats for public user: mine77
User API Error: {"message":"API rate limit exceeded for 38.190.50.241. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)","documentation_url":"https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"}

GitHub API Error: Error: GitHub API Error: 403
    at fetchGitHubStats (webpack-internal:///(rsc)/./lib/github.ts:157:19)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async GET (webpack-internal:///(rsc)/./app/api/user/[username]/route.ts:23:23)
    at async /Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:55831
    at async eO.execute (/Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46527)
    at async eO.handle (/Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57165)
    at async doRender (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1352:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1562:40)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1482:28)
    at async DevServer.renderPageComponent (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1908:24)
    at async DevServer.renderToResponseImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1946:32)
    at async DevServer.pipeImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:921:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:817:17)
    at async /Users/ashnouruzi/gitwrap/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/ashnouruzi/gitwrap/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:173:21)
    at async handleRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:350:24)
    at async requestHandlerImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:374:13)
    at async Server.requestListener (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/start-server.js:141:13)
Error fetching data for user mine77: Error: Failed to fetch GitHub data
    at fetchGitHubStats (webpack-internal:///(rsc)/./lib/github.ts:289:15)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async GET (webpack-internal:///(rsc)/./app/api/user/[username]/route.ts:23:23)
    at async /Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:55831
    at async eO.execute (/Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46527)
    at async eO.handle (/Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57165)
    at async doRender (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1352:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1562:40)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1482:28)
    at async DevServer.renderPageComponent (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1908:24)
    at async DevServer.renderToResponseImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1946:32)
    at async DevServer.pipeImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:921:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:817:17)
    at async /Users/ashnouruzi/gitwrap/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/ashnouruzi/gitwrap/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:173:21)
    at async handleRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:350:24)
    at async requestHandlerImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:374:13)
    at async Server.requestListener (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/start-server.js:141:13)
Full error details: {
  name: 'Error',
  message: 'Failed to fetch GitHub data',
  stack: 'Error: Failed to fetch GitHub data\n' +
    '    at fetchGitHubStats (webpack-internal:///(rsc)/./lib/github.ts:289:15)\n' +
    '    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n' +
    '    at async GET (webpack-internal:///(rsc)/./app/api/user/[username]/route.ts:23:23)\n' +
    '    at async /Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:55831\n' +
    '    at async eO.execute (/Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46527)\n' +
    '    at async eO.handle (/Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57165)\n' +
    '    at async doRender (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1352:42)\n' +
    '    at async cacheEntry.responseCache.get.routeKind (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1562:40)\n' +
    '    at async DevServer.renderToResponseWithComponentsImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1482:28)\n' +
    '    at async DevServer.renderPageComponent (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1908:24)\n' +
    '    at async DevServer.renderToResponseImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1946:32)\n' +
    '    at async DevServer.pipeImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:921:25)\n' +
    '    at async NextNodeServer.handleCatchallRenderRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/next-server.js:272:17)\n' +
    '    at async DevServer.handleRequestImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:817:17)\n' +
    '    at async /Users/ashnouruzi/gitwrap/node_modules/next/dist/server/dev/next-dev-server.js:339:20\n' +
    '    at async Span.traceAsyncFn (/Users/ashnouruzi/gitwrap/node_modules/next/dist/trace/trace.js:154:20)\n' +
    '    at async DevServer.handleRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/dev/next-dev-server.js:336:24)\n' +
    '    at async invokeRender (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:173:21)\n' +
    '    at async handleRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:350:24)\n' +
    '    at async requestHandlerImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:374:13)\n' +
    '    at async Server.requestListener (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/start-server.js:141:13)'
}
 GET /api/user/mine77 500 in 1277ms
User API Error: {"message":"API rate limit exceeded for 38.190.50.241. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)","documentation_url":"https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"}

GitHub API Error: Error: GitHub API Error: 403
    at fetchGitHubStats (webpack-internal:///(rsc)/./lib/github.ts:157:19)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async GET (webpack-internal:///(rsc)/./app/api/user/[username]/route.ts:23:23)
    at async /Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:55831
    at async eO.execute (/Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46527)
    at async eO.handle (/Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57165)
    at async doRender (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1352:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1562:40)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1482:28)
    at async DevServer.renderPageComponent (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1908:24)
    at async DevServer.renderToResponseImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1946:32)
    at async DevServer.pipeImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:921:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:817:17)
    at async /Users/ashnouruzi/gitwrap/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/ashnouruzi/gitwrap/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:173:21)
    at async handleRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:350:24)
    at async requestHandlerImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:374:13)
    at async Server.requestListener (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/start-server.js:141:13)
Error fetching data for user mine77: Error: Failed to fetch GitHub data
    at fetchGitHubStats (webpack-internal:///(rsc)/./lib/github.ts:289:15)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async GET (webpack-internal:///(rsc)/./app/api/user/[username]/route.ts:23:23)
    at async /Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:55831
    at async eO.execute (/Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46527)
    at async eO.handle (/Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57165)
    at async doRender (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1352:42)
    at async cacheEntry.responseCache.get.routeKind (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1562:40)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1482:28)
    at async DevServer.renderPageComponent (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1908:24)
    at async DevServer.renderToResponseImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1946:32)
    at async DevServer.pipeImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:921:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/next-server.js:272:17)
    at async DevServer.handleRequestImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:817:17)
    at async /Users/ashnouruzi/gitwrap/node_modules/next/dist/server/dev/next-dev-server.js:339:20
    at async Span.traceAsyncFn (/Users/ashnouruzi/gitwrap/node_modules/next/dist/trace/trace.js:154:20)
    at async DevServer.handleRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/dev/next-dev-server.js:336:24)
    at async invokeRender (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:173:21)
    at async handleRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:350:24)
    at async requestHandlerImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:374:13)
    at async Server.requestListener (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/start-server.js:141:13)
Full error details: {
  name: 'Error',
  message: 'Failed to fetch GitHub data',
  stack: 'Error: Failed to fetch GitHub data\n' +
    '    at fetchGitHubStats (webpack-internal:///(rsc)/./lib/github.ts:289:15)\n' +
    '    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n' +
    '    at async GET (webpack-internal:///(rsc)/./app/api/user/[username]/route.ts:23:23)\n' +
    '    at async /Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:55831\n' +
    '    at async eO.execute (/Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:46527)\n' +
    '    at async eO.handle (/Users/ashnouruzi/gitwrap/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:57165)\n' +
    '    at async doRender (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1352:42)\n' +
    '    at async cacheEntry.responseCache.get.routeKind (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1562:40)\n' +
    '    at async DevServer.renderToResponseWithComponentsImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1482:28)\n' +
    '    at async DevServer.renderPageComponent (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1908:24)\n' +
    '    at async DevServer.renderToResponseImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:1946:32)\n' +
    '    at async DevServer.pipeImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:921:25)\n' +
    '    at async NextNodeServer.handleCatchallRenderRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/next-server.js:272:17)\n' +
    '    at async DevServer.handleRequestImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/base-server.js:817:17)\n' +
    '    at async /Users/ashnouruzi/gitwrap/node_modules/next/dist/server/dev/next-dev-server.js:339:20\n' +
    '    at async Span.traceAsyncFn (/Users/ashnouruzi/gitwrap/node_modules/next/dist/trace/trace.js:154:20)\n' +
    '    at async DevServer.handleRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/dev/next-dev-server.js:336:24)\n' +
    '    at async invokeRender (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:173:21)\n' +
    '    at async handleRequest (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:350:24)\n' +
    '    at async requestHandlerImpl (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/router-server.js:374:13)\n' +
    '    at async Server.requestListener (/Users/ashnouruzi/gitwrap/node_modules/next/dist/server/lib/start-server.js:141:13)'
}
 GET /api/user/mine77 500 in 1505ms
