  import React, { useEffect, useState } from "react";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import { Card } from "@/components/ui/card";
  import { createFileRoute, Link } from "@tanstack/react-router";
  import { Droplet, Edit, LogOut, Plus } from "lucide-react";

  export const Route = createFileRoute("/editPage")({
    component: Home,
  });

  type Plant = {
    name: string;
    description: string;
    image: string;
    moisture: string;
    requiredMoisture: string;
  };

  function Home() {
    const [plants, setPlants] = useState<Plant[]>([]);

    useEffect(() => {
      const saved = localStorage.getItem("plants");
      if (saved) {
        setPlants(JSON.parse(saved));
      }
    }, []);

    return (
      <>
        <div className="flex justify-between items-center ">
          <div className="flex gap-5 items-center">
            <img src="image.webp" className="h-12" alt="User Avatar" />
            <p className="text-2xl">Cześć, IMIĘ!</p>
          </div>
          <Button className="text-2xl">
            Wyloguj <LogOut />
          </Button>
        </div>

        <div className="mt-8 flex items-center">
          <h6 className="text-2xl">Twoje rośliny</h6>
          <Button className="ml-auto text-xl" size="lg" asChild>
            <Link to="/editPage">
              <Plus className="mr-2" />
              Nowa roślina
            </Link>
          </Button>
        </div>

        <div className="mt-4 flex flex-col md:flex-row flex-wrap gap-4">
          {plants.map((plant, index) => {
            const moisture = parseInt(plant.moisture);
            const required = parseInt(plant.requiredMoisture);
            const needsWater = moisture < required;

            return (
              <Card key={index} className="flex flex-col p-0 w-full md:w-[300px]">
                <div className="relative w-full">
                  <img
                    src={plant.image}
                    className="object-cover h-60 w-full rounded-t-xl"
                    alt={`Zdjęcie ${plant.name}`}
                  />
                  {needsWater && (
                    <Badge
                      variant="destructive"
                      className="absolute -bottom-4.5 right-4.5"
                    >
                      😭 Podlej mnie!
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-2xl font-bold">{plant.name}</p>
                  <p className="text-base text-gray-700 mt-2">{plant.description}</p>
                  <div className="flex gap-5 mt-4 justify-between">
                    <Button
                      size="lg"
                      className={`text-2xl ${
                        needsWater ? "bg-destructive" : "bg-green-700"
                      }`}
                    >
                      <Droplet />
                      {plant.moisture}%/{plant.requiredMoisture}%
                    </Button>
                    <Button size="lg" className="text-xl">
                      <Edit /> Edycja
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </>
    );
  }
