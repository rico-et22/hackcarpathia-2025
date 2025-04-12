import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="max-w-[300px] mx-auto">
      <img src="image.png" alt="" className="w-[50%] mx-auto block"/>

      <div className="text-center">
        
        <h1 className="mb-[50px]">BLOOM</h1>
        <h2 >
        Planuj swój ogród
        </h2>
      <h2 >
      Oszczędzaj wodę
      </h2>
        
      </div>

      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
