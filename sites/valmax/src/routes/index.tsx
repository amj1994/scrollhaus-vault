import { createFileRoute } from "@tanstack/react-router";
import ValmaxLanding from "@/components/ValmaxLanding";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <ValmaxLanding />;
}
