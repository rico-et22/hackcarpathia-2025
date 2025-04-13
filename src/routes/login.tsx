import { login, loginGoogle } from "@/api/requests";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";

export const Route = createFileRoute("/login")({
  component: Index,
});

function Index() {
  const form = useForm<LoginRequest>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_ITEM, data.token);
      navigate({ to: "/home" });
    },
  });

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      confirmGoogleLogin({ token: codeResponse.access_token });
    },
  });

  const { mutate: confirmGoogleLogin } = useMutation<
    any,
    any,
    { token: string }
  >({
    mutationFn: (data) => loginGoogle(data.token),
    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_ITEM, data.token);
      navigate({ to: "/home" });
    },
  });

  const onSubmit = (data: LoginRequest) => {
    mutate(data);
  };

  useEffect(() => {
    queryClient.resetQueries();
  }, []);

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
              type="button"
              onClick={() => {
                Notification.requestPermission();
                form.handleSubmit(onSubmit)();
              }}
              size="lg"
              className="w-full text-2xl"
              disabled={isPending}
            >
              Zaloguj
            </Button>
            <Button
              type="button"
              onClick={() => {
                Notification.requestPermission();
                loginWithGoogle();
              }}
              size="lg"
              variant="outline"
              className="w-full text-2xl"
              disabled={isPending}
            >
              <svg
                class="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Zaloguj z Google
            </Button>
            {error && (
              <p className="text-destructive">Nie znaleziono użytkownika</p>
            )}
            <Link to="/register">
              <Button
                type="button"
                size="lg"
                className="w-full text-2xl"
                variant="outline"
              >
                Zarejestruj
              </Button>
            </Link>
          </form>
        </Form>
      </div>
    </>
  );
}
