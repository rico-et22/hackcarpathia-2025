import React, { useEffect, useState } from "react";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/editPage")({
  component: EditPage,
});

function EditPage() {
  const navigate = useNavigate();
  const { index }: { index: string } = useParams({ strict: false }); // this gets the index from the URL
  const plantIndex = parseInt(index);

  const [plantName, setPlantName] = useState("");
  const [plantDescription, setPlantDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string>("");
  const [moisture, setMoisture] = useState("");
  const [requiredMoisture, setRequiredMoisture] = useState("");

  useEffect(() => {
    const plants = JSON.parse(localStorage.getItem("plants") || "[]");
    const plant = plants[plantIndex];

    if (plant) {
      setPlantName(plant.name);
      setPlantDescription(plant.description);
      setMoisture(plant.moisture);
      setRequiredMoisture(plant.requiredMoisture);
      setExistingImage(plant.image);
    }
  }, [plantIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const plants = JSON.parse(localStorage.getItem("plants") || "[]");

    const updatePlant = (image: string) => {
      plants[plantIndex] = {
        name: plantName,
        description: plantDescription,
        moisture,
        requiredMoisture,
        image,
      };

      localStorage.setItem("plants", JSON.stringify(plants));
      navigate({ to: "/home" });
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        updatePlant(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      updatePlant(existingImage);
    }
  };

  const handleCancel = () => {
    navigate({ to: "/home" });
  };

  return (
    <>
      <div className="max-w-xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6">Edytuj roślinę</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <Label>Nazwa rośliny</Label>
            <Input
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Opis</Label>
            <textarea
              value={plantDescription}
              onChange={(e) => setPlantDescription(e.target.value)}
              placeholder="Napisz coś o tej roślinie..."
              required
              className="border rounded p-2 w-full min-h-[100px] bg-white"
            />
          </div>

          <div>
            <Label>Zdjęcie rośliny</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            {!imageFile && existingImage && (
              <img
                src={existingImage}
                alt="Obecne zdjęcie"
                className="mt-2 h-32 object-cover rounded"
              />
            )}
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <Button type="submit" size="lg" className="text-xl">
              Zapisz zmiany
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="text-xl"
              onClick={handleCancel}
            >
              Anuluj
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
