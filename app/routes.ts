import { flatRoutes } from "@react-router/fs-routes";

import type { RouteConfig } from "@react-router/dev/routes";

export default flatRoutes({
  rootDirectory: "./routes",
}) satisfies RouteConfig;