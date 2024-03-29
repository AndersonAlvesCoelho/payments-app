// IMPORTS
import type { Metadata } from "next";

// SERVICES
import { UserProvider } from "@/context/UserContext";
import { BalanceProvider } from "@/context/BalanceContext";
import { PaymentProvider } from "@/context/PaymentContext";

// COMPONENTS
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agência De pagamento",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-50`}>
        <Toaster />
        <NextTopLoader />

        <UserProvider>
          <BalanceProvider>
            <PaymentProvider>{children}</PaymentProvider>
          </BalanceProvider>
        </UserProvider>
      </body>
    </html>
  );
}
