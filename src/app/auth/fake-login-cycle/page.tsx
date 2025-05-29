
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FakeLoginCyclePage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Вход в аккаунт (Демо)</CardTitle>
          <CardDescription>Это демонстрационная страница входа.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fake-login">Логин</Label>
            <Input id="fake-login" type="text" placeholder="Введите ваш логин" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fake-password">Пароль</Label>
            <Input id="fake-password" type="password" placeholder="Введите ваш пароль" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Link href="/profile" className="w-full">
            <Button className="w-full rounded-lg">
              <LogIn className="mr-2 h-5 w-5" />
              Войти
            </Button>
          </Link>
          <Button variant="outline" className="w-full rounded-lg" disabled>
            <UserPlus className="mr-2 h-5 w-5" />
            Зарегистрироваться
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
