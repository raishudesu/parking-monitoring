import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/session-provider";
import { NotificationProvider } from "@/providers/notification-provider";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "ParkSU",
  title: "ParkSU",
  description:
    "Real-time Web-Based Parking Monitoring System with Data Analytics and Visualization.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ParkSU",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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
          <NotificationProvider>
            <main>{children}</main>
            <Toaster />
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
