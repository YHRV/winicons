"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function SignUpForm({ message }: { message: any }) {
  return (
    <form
      className="flex flex-col min-w-64 max-w-64 mx-auto"
      onSubmit={(e) => {
        const form = e.currentTarget;
        const password = form.password.value;

        if (password.length < 8) {
          e.preventDefault();
          alert("La contraseña debe tener al menos 8 caracteres");
          return;
        }

        if (!/[A-Z]/.test(password)) {
          e.preventDefault();
          alert("La contraseña debe contener al menos una mayúscula");
          return;
        }

        if (!/[0-9]/.test(password)) {
          e.preventDefault();
          alert("La contraseña debe contener al menos un número");
          return;
        }
      }}
    >
      <h1 className="text-2xl font-medium">Sign up</h1>
      <p className="text-sm text text-foreground">
        Already have an account?{" "}
        <Link className="text-primary font-medium underline" href="/sign-in">
          Sign in
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
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          minLength={8}
          required
          title="La contraseña debe tener al menos 8 caracteres, una mayúscula y un número"
        />
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          The password must have:
          <ul className="list-disc list-inside ml-2">
            <li>At least 8 characters</li>
            <li>At least one uppercase letter</li>
            <li>At least one number</li>
          </ul>
        </div>
        <SubmitButton formAction={signUpAction} pendingText="Signing up...">
          Sign up
        </SubmitButton>

        <FormMessage message={message} />
      </div>
    </form>
  );
}
