import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { PWAInstallElement } from "@khmyznikov/pwa-install";
import PWAInstall from "@khmyznikov/pwa-install/react-legacy";
import { useRef } from "react";

const RootRoute = () => {
  const pwaInstallRef = useRef<PWAInstallElement>(null);

  return (
    <div className="max-w-[500px] mx-auto p-4">
      <Outlet />
      <TanStackRouterDevtools />
      <PWAInstall
        ref={pwaInstallRef}
        manifest-url="/manifest.webmanifest"
      ></PWAInstall>
    </div>
  );
};

export const Route = createRootRoute({
  component: RootRoute,
});
