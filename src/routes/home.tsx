import { getUserInfo, getUserPlants, logout } from "@/api/requests";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ACCESS_TOKEN_ITEM } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Droplet, Edit, LogOut, Plus } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    localStorage.removeItem(ACCESS_TOKEN_ITEM);
    navigate({ to: "/login" });
  };

  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const { data: plants } = useQuery({
    queryKey: ["plants"],
    queryFn: () => getUserPlants(data?.id),
    enabled: !!data?.id,
  });

  return (
    <>
      <div className="flex justify-between items-center ">
        <div className="flex gap-5 items-center">
          <img src="image.webp" className="h-12" />
          <p className="text-2xl">Cześć, {data?.name}!</p>
        </div>
        <Button className="text-2xl" onClick={handleLogout}>
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
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plants?.map((plant) => (
          <Card
            key={plant.id}
            className="flex gap-5 justify-center p-0 bg-red-100 border-0"
          >
            <div className="relative w-full mb-auto">
              <img
                src="IMG_0484.jpeg"
                className="object-cover h-70 w-full rounded-t-xl"
              />
              <Badge
                variant="destructive"
                className="absolute -bottom-4.5 right-4.5"
              >
                😭 Podlej mnie!
              </Badge>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold">{plant.name}</p>
              <p className="text-wrap">{plant.description}</p>
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
        ))}
        <Card className="flex gap-5 justify-center p-0 bg-teal-50 border-0">
          <div className="relative w-full">
            <img
              src="IMG_0484.jpeg"
              className="object-cover h-70 w-full rounded-t-xl"
            />
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
