import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="max-w-[500px] mx-auto">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
