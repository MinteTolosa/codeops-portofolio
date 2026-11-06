import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CartHydration from "./components/CartHydration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Addis Eats | Ethiopian Food Ordering",
    template: "%s | Addis Eats",
  },

  description:
    "Discover Ethiopian dishes, explore the menu, and order your favorites with Addis Eats.",

  openGraph: {
    title: "Addis Eats | Ethiopian Food Ordering",
    description:
      "Explore Ethiopian food and order your favorite dishes with Addis Eats.",
    siteName: "Addis Eats",
    type: "website",
    url: "/",
  },

  twitter: {
    card: "summary_large_image",
    title: "Addis Eats | Ethiopian Food Ordering",
    description:
      "Explore Ethiopian food and order your favorite dishes with Addis Eats.",
  },
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartHydration />
        <Navbar />
        {children}
        <Footer />  
      </body>
    </html>
  );
}
