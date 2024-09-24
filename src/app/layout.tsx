import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "@/components/convex-client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Events Registration",
  description: "Events Registration App built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConvexClientProvider>
            {/* <Toaster />
            <Modals /> */}
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
