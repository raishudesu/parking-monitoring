import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/session-provider";
import { NotificationProvider } from "@/providers/notification-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { GoogleMapsProvider } from "@/providers/google-maps-provider";
import Pwa from "@/components/pwa";

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
      <meta property="og:image" content="/og-image.png"></meta>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <NotificationProvider>
              <GoogleMapsProvider>
                <main>{children}</main>
                <Toaster />
              </GoogleMapsProvider>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
        <Pwa />
      </body>
    </html>
  );
}
