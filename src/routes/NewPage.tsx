import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { StorePlantRequest } from "@/types/formRequest";
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
import { getUserInfo, storePlant } from "@/api/requests";
import { BluetoothConnected, BluetoothSearching } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/NewPage")({
  component: NewPage,
});

function NewPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const validationSchema = z.object({
    name: z.string().min(1, "Nazwa rośliny jest wymagana"),
    description: z.string().optional(),
    photo: z.instanceof(File, {
      message: "Zdjęcie rośliny jest wymagane",
    }),
  });

  const { data: info } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const { mutate, isPending, error } = useMutation<any, any, StorePlantRequest>(
    {
      mutationFn: (data) => storePlant(info?.id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["plants"] });

        navigate({ to: "/home" });
      },
    }
  );

  const handleSubmit = (data: StorePlantRequest) => {
    mutate(data);
  };

  const handleCancel = () => {
    navigate({ to: "/home" });
  };

  const form = useForm<StorePlantRequest>({
    resolver: zodResolver(validationSchema),
  });

  const [connected, setConnected] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setConnected(true);
    }, 3000);
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Nowa roślina</h2>
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
                    accept="image/jpeg,image/png"
                    {...fieldProps}
                    value={undefined}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (
                          file.type === "image/jpeg" ||
                          file.type === "image/png"
                        ) {
                          onChange(file);
                        } else {
                          alert("Tylko pliki JPG i PNG są dozwolone");
                        }
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
                {value instanceof File && (
                  <img
                    src={URL.createObjectURL(value)}
                    alt="Current"
                    className="mt-2 h-50 object-cover rounded"
                  />
                )}
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2 mt-4 text-2xl">
            {connected ? <BluetoothConnected /> : <BluetoothSearching />}
            <p>{connected ? "Połączono z czujnikiem" : "Łączę z czujnikiem"}</p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <Button
              type="submit"
              size="lg"
              className="text-xl"
              disabled={isPending || !connected}
            >
              Dodaj
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
              Wystąpił błąd przy dodawaniu rośliny
            </p>
          )}
        </form>
      </Form>
    </div>
  );
}
