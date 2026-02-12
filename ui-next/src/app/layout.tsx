import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { getSiteUrlObject } from "@/shared/seo/siteUrl";

export const metadata: Metadata = {
  metadataBase: getSiteUrlObject(),
  title: {
    default: "Monstrino",
    template: "%s | Monstrino",
  },
  description: "Monster High Collection & Release Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
