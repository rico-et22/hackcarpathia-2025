import { ACCESS_TOKEN_COOKIE } from "@/lib/constants";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  if (localStorage.getItem(ACCESS_TOKEN_COOKIE)) return <Navigate to="/home" />;
  return <Navigate to="/login" />;
}
