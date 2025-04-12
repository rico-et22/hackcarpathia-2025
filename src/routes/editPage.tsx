import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UpdatePlantRequest } from "@/types/formRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { getUserInfo, getUserPlantById, updatePlant } from "@/api/requests";
import { useEffect } from "react";
import { BluetoothConnected } from "lucide-react";

export const Route = createFileRoute("/editPage")({
  component: EditPage,
});

function EditPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const id = new URLSearchParams(window.location.search).get("id");

  const validationSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    photo: z.instanceof(File).optional(),
  });

  const { data: info } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const { data: plant } = useQuery({
    queryKey: ["plant"],
    queryFn: () => getUserPlantById(info?.id, id!),
    enabled: !!info?.id && !!id,
  });

  const { mutate, isPending, error } = useMutation<
    any,
    any,
    UpdatePlantRequest
  >({
    mutationFn: (data) => updatePlant(info?.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });

      navigate({ to: "/home" });
    },
  });

  const handleSubmit = (data: UpdatePlantRequest) => {
    mutate(data);
  };

  const handleCancel = () => {
    navigate({ to: "/home" });
  };

  const form = useForm<UpdatePlantRequest>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: plant?.name,
      description: plant?.description || "",
    },
  });

  useEffect(() => {
    if (plant) {
      form.setValue("name", plant.name);
      form.setValue("description", plant.description || "");
    }
  }, [plant]);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Edycja rośliny</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwa rośliny</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opis rośliny</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Zdjęcie rośliny</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...fieldProps}
                    value={undefined}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
                {value instanceof File ? (
                  <img
                    src={URL.createObjectURL(value)}
                    alt="Current"
                    className="mt-2 h-50 object-cover rounded"
                  />
                ) : (
                  <img
                    src={plant?.photo}
                    className="mt-2 h-50 object-cover rounded"
                    alt="Current"
                  />
                )}
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2 mt-4 text-2xl">
            <BluetoothConnected />
            <p>Połączono z czujnikiem</p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <Button
              type="submit"
              size="lg"
              className="text-xl"
              disabled={isPending}
            >
              Zapisz
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
          {error && (
            <p className="text-destructive">
              Wystąpił błąd przy zapisywaniu rośliny
            </p>
          )}
        </form>
      </Form>
    </div>
  );
}
