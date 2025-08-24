import type { Metadata } from "next";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "GitHub Activity Viewer",
  description: "View GitHub contribution statistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black font-mono">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
