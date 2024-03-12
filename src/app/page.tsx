"use client";

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
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

export default function Home() {
  return (
    <form className="flex min-h-screen justify-center items-center ">
      <Card className="min-w-[350px]">
        <CardHeader>
          <CardTitle>Olá de novo!!</CardTitle>
          <CardDescription>Welcome Back.</CardDescription>
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
