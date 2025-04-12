import { register } from "@/api/requests";
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
import { RegisterRequest } from "@/types/formRequest";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const validationSchema = z
    .object({
      name: z
        .string({ required_error: "Pole wymagane" })
        .min(5, "Minimum 5 znaków"),
      email: z
        .string({ required_error: "Adres e-mail jest wymagany" })
        .min(1, "Niepoprawny adres e-mail")
        .email("Niepoprawny adres e-mail"),
      password: z
        .string({ required_error: "Hasło wymagane" })
        .min(8, "Hasło musi mieć co najmniej 8 znaków"),
      password_confirmation: z
        .string({ required_error: "Hasło wymagane" })
        .min(8, "Hasło musi mieć co najmniej 8 znaków"),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Hasła nie są identyczne",
      path: ["password_confirmation"],
    });
  const form = useForm<RegisterRequest>({
    resolver: zodResolver(validationSchema),
  });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_ITEM, data.token);
      navigate({ to: "/home" });
    },
  });

  const onSubmit = (data: RegisterRequest) => {
    mutate(data);
  };
  return (
    <>
      <div className="max-w-[500px] mx-auto">
        <div className="text-center">
          <h1 className="text-2xl text=[#000000] font-bold">Rejestracja</h1>
        </div>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  </div>{" "}
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-4 block">Powtórz hasło</FormLabel>
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
                  </div>{" "}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="lg"
              className="w-full text-2xl"
              disabled={isPending}
            >
              Zarejestruj
            </Button>
            {error && (
              <p className="text-destructive">Wystąpił błąd przy rejestracji</p>
            )}
            <Link to="/login">
              <Button
                type="submit"
                size="lg"
                className="w-full text-2xl"
                variant="outline"
              >
                Powrót
              </Button>
            </Link>
          </form>
        </Form>
      </div>
    </>
  );
}
