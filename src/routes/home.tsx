import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Droplet, Edit, Leaf } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: Home,
});

function Home() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <img src="icon.png" className="h-12" />
          <p className="text-2xl">Cześć, IMIĘ!</p>
        </div>
        <Button className="text-2xl">Wyloguj</Button>
      </div>
      <div className="mt-8">
        <Card className="flex flex-row gap-5 justify-center">
          <Leaf />
          <p className="text-2xl">Roślina</p>
          <p className="text-2xl">Podlej!</p>
          <Button size="lg">
            <Droplet />
          </Button>
          <Button size="lg">
            <Edit />
          </Button>
        </Card>
      </div>
    </>
  );
}
