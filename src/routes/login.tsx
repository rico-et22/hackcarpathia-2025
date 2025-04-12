import { login } from "@/api/requests";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ACCESS_TOKEN_ITEM } from "@/lib/constants";
import { LoginRequest } from "@/types/formRequest";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/login")({
  component: Index,
});

function Index() {
  const form = useForm<LoginRequest>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_ITEM, data.token);
      navigate({ to: "/home" });
    },
  });

  const onSubmit = (data: LoginRequest) => {
    mutate(data);
  };
  return (
    <>
      <div className="max-w-[500px] mx-auto">
        <img
          src="image.webp"
          alt=""
          className="w-[50%] mx-auto block font-bold"
        />

        <div className="text-center">
          <h1 className="text-4xl mb-[50px] font-bold">BLOOM</h1>
          <h1 className="text-2xl text=[#000000] font-bold">
            Planuj swój domowy ogród
          </h1>
          <h1 className="text-2xl mb-[50px] text-[#5D7948] font-bold">
            Oszczędzaj wodę
          </h1>
        </div>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="nazwa@email.pl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-4 block">Hasło</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="*********"
                        className="pr-14"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                    >
                      {showPassword ? "Schowaj" : "Pokaż"}
                    </button>
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="lg"
              className="w-full text-2xl"
              disabled={isPending}
            >
              Zaloguj
            </Button>
            {error && (
              <p className="text-destructive">Nie znaleziono użytkownika</p>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
