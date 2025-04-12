import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Droplet, Edit, LogOut, Plus } from "lucide-react";
import { getUserInfo, getUserPlants, logout } from "@/api/requests";
import { ACCESS_TOKEN_ITEM } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

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
    refetchInterval: 1000 * 10,
  });

  return (
    <>
      <div className="flex justify-between items-center ">
        <div className="flex gap-5 items-center">
          <img src="image.webp" className="h-12" alt="User Avatar" />
          <p className="text-2xl">Cześć, {data?.name}!</p>
        </div>
        <Button className="text-2xl" onClick={handleLogout}>
          Wyloguj <LogOut />
        </Button>
      </div>
      <div className="mt-8 flex items-center">
        <h6 className="text-2xl">Twoje rośliny</h6>
        <Link to="/NewPage" className="ml-auto">
          <Button className="text-xl" size="lg">
            <Plus className="mr-2" />
            Nowa roślina
          </Button>
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plants?.map((plant) => (
          <Card
            key={plant.id}
            className={cn("flex gap-5 justify-center p-0 border-0", {
              " bg-red-100 ": plant.current_humidity < plant.expected_humidity,
              " bg-green-100 ":
                plant.current_humidity >= plant.expected_humidity,
            })}
          >
            <div className="relative w-full mb-auto">
              <img
                src="IMG_0484.jpeg"
                className="object-cover h-70 w-full rounded-t-xl"
              />
              {plant.current_humidity < plant.expected_humidity && (
                <Badge
                  variant="destructive"
                  className="absolute -bottom-4.5 right-4.5"
                >
                  😭 Podlej mnie!
                </Badge>
              )}
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold">{plant.name}</p>
              <p className="text-wrap">{plant.description}</p>
              <div className="flex gap-5 mt-2 justify-between">
                <Button
                  size="lg"
                  className={cn("text-2xl", {
                    "bg-destructive":
                      plant.current_humidity < plant.expected_humidity,
                    "bg-green-500":
                      plant.current_humidity >= plant.expected_humidity,
                  })}
                >
                  <Droplet /> {plant.current_humidity}%/
                  {plant.expected_humidity}%
                </Button>
                <Button size="lg" className="text-2xl">
                  <Edit /> Edycja
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
