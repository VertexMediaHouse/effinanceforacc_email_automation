import { onRequestGet as __api___path___js_onRequestGet } from "D:\\AI\\Effinanceforacc_EmailAutomationDashboard\\functions\\api\\[[path]].js"
import { onRequestOptions as __api___path___js_onRequestOptions } from "D:\\AI\\Effinanceforacc_EmailAutomationDashboard\\functions\\api\\[[path]].js"

export const routes = [
    {
      routePath: "/api/:path*",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api___path___js_onRequestGet],
    },
  {
      routePath: "/api/:path*",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api___path___js_onRequestOptions],
    },
  ]