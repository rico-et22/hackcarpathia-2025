import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/login")({
  component: Index,
});

function Index() {
  const form = useForm();


    
  
  const [showPassword, setShowPassword] = useState(false);
  return (
    <><div className="max-w-[500px] mx-auto">

      <div className="max-w-[300px] mx-auto">
        <img src="image.png" alt="" className="w-[50%] mx-auto block" />

        <div className="text-center">

          <h1 className="mb-[50px]">BLOOM</h1>
          <h2>
            Planuj swój ogród
          </h2>
          <h2 className="mb-[50px]">
            Oszczędzaj wodę
          </h2 >

        </div>

      </div>

    </div><Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
                <FormLabel className="mt-4 block">Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      name="password"
                      className="pr-14" />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </FormItem>

            )} />
        </form>
      </Form></>
  );
}
