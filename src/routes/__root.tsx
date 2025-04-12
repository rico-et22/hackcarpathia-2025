import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="max-w-[500px] mx-auto">
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
      
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
      </div>
    // </>
    
  ),
});
