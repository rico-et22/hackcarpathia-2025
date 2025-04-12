import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Droplet, Edit, LogOut, Plus } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: Home,
});

function Home() {
  return (
    <>
      <div className="flex justify-between items-center ">
        <div className="flex gap-5 items-center">
          <img src="image.webp" className="h-12" />
          <p className="text-2xl">Cześć, IMIĘ!</p>
        </div>
        <Button className="text-2xl">
          Wyloguj <LogOut />
        </Button>

      </div>
      <div className="mt-8 flex items-center ">
          <h6 className="text-2xl">Twoje rośliny</h6>
          <Button className="ml-auto text-xl" size="lg">
            <Plus />
            Nowa roślina
          </Button>
        </div>
      <div className="mt-4 flex flex-col md:flex-row flex-wrap gap-4">
        
        <Card className="flex gap-5 justify-center p-0 bg-red-100 border-0">
          <div className="relative w-full">
            <img src="IMG_0484.jpeg" className="object-cover h-70 w-full rounded-t-xl" />
            <Badge
              variant="destructive"
              className="absolute -bottom-4.5 right-4.5"
            >
              😭 Podlej mnie!
            </Badge>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold">Fiołek</p>
            <div className="flex gap-5 mt-2 justify-between">
              <Button size="lg" className="bg-destructive text-2xl">
                <Droplet /> 20%/30%
              </Button>
              <Button size="lg" className="text-2xl">
                <Edit /> Edycja
              </Button>
            </div>
          </div>
        </Card>
        <Card className="flex gap-5 justify-center p-0 bg-teal-50 border-0">
          <div className="relative w-full">
            <img src="IMG_0484.jpeg" className="object-cover h-70 w-full rounded-t-xl" />
            
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold">Fiołek</p>
            <div className="flex gap-5 mt-2 justify-between">
              <Button size="lg" className="bg-green-700 text-2xl">
                <Droplet /> 70%/30%
              </Button>
              <Button size="lg" className="text-2xl">
                <Edit /> Edycja
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
