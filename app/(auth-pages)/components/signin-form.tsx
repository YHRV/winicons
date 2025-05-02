"use client";

import { signInAction } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function SignInForm({ message }: { message: any }) {
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="flex-1 flex flex-col min-w-64"
      onSubmit={(e) => {
        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;

        if (!email.includes("@")) {
          e.preventDefault();
          setError("Por favor ingresa un email válido");
          return;
        }

        if (password.length < 6) {
          e.preventDefault();
          setError("La contraseña debe tener al menos 6 caracteres");
          return;
        }

        setError(null);
      }}
    >
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Por favor ingresa un email válido"
        />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          minLength={6}
          required
          title="La contraseña debe tener al menos 6 caracteres"
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <FormMessage message={message} />
      </div>
    </form>
  );
}
