"use client";

// IMPORTS
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// SERVICES
import * as z from "zod";
import app from "@/utils/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import { useState } from "react";
import { FormMessage } from "../ui/form";

const FormSchema = z.object({
  email: z.string().email({
    message: "Provide a valid email.",
  }),
  password: z.string(),
});

export default function LayoutLogin() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchema),
  });

  const [passwordView, setPasswordView] = useState(false);

  async function onSubmit({ email, password }: z.infer<typeof FormSchema>) {
    const auth = getAuth(app);
    console.log("email, password ", email, password);
    // try {
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );
    //   const user = userCredential.user;
    //   console.log("Usuário cadastrado:", user);
    // } catch (error) {
    //   console.error("Erro ao cadastrar usuário:", error.message);
    // }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-screen justify-center items-center "
    >
      <Card className="min-w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl font-medium">Olá de novo!!</CardTitle>
          <CardDescription className="text-xl font-medium">
            Bem vindo de volta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <Input id="name" placeholder="E-mail" />

            <div className="relative">
              <Input
                type={!passwordView ? "password" : "text"}
                placeholder="Password"
                {...register("password")}
              />
              <Button
                className="absolute inset-y-0 end-0 flex items-center"
                type="button"
                variant="link"
                onClick={() => setPasswordView(!passwordView)}
              >
                {!passwordView ? (
                  <EyeIcon className="h-6 w-6 text-secondary-300  " />
                ) : (
                  <EyeOffIcon className="h-6 w-6 text-secondary-300" />
                )}
              </Button>
            </div>
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
