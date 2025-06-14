import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { Toaster } from "sonner";
import Image from "next/image";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "winicons",
  description: "The windows icons collection",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-14 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link
                      className="text-2xl flex items-center gap-2 hover:opacity-80 transition-opacity"
                      href={"/"}
                    >
                      <Image
                        src="/icon.png"
                        alt="winicons logo"
                        width={32}
                        height={32}
                        className="rounded-md"
                        priority
                      />
                      winicons
                    </Link>
                    {/*
                     <div className="flex items-center gap-2">
                      <DeployButton /> 
                    </div>
                    */}
                  </div>
                  <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-14 max-w-8xl ">{children}</div>
            </div>
          </main>
          <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
            <p>
              &copy; {new Date().getFullYear()} winicons. All rights reserved.
            </p>
          </footer>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
