"use client";

// IMPORTS
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// SERVICES
import * as z from "zod";

// COMPONENTS
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const FormSchema = z
  .object({
    email: z.string().email({
      message: "Provide a valid email.",
    }),
    password: z
      .string()
      .min(6, {
        message: "password must be at least 6 characters.",
      })
      .max(8, {
        message: "password must not be longer than 8 characters.",
      }),
    confirmPassword: z.string(),
    privacyPolicy: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchema),
  });

  async function onSubmit({ email, password }: z.infer<typeof FormSchema>) {}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-screen justify-center items-center "
    >
      <Card className="min-w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl font-medium">
            Tem certeza que você irá gostar!
          </CardTitle>
          <CardDescription className="text-xl font-medium">
            Vamos criar sua conta?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <Input id="name" placeholder="E-mail" />
            <Input id="name" placeholder="******" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="register">
            <Button variant="link">Eu não tenho um conta!</Button>
          </Link>
          <Button>Entrar</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
