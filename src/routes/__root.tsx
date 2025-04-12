import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootRoute = () => {
  const pwaInstallRef = useRef<PWAInstallElement>(null);

  return (
    <div className="max-w-[500px] mx-auto p-4">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
