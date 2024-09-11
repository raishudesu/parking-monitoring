import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/session-provider";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ParkSU",
  description:
    "Real-time Web-Based Parking Monitoring System with Data Analytics and Visualization.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <main>{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
