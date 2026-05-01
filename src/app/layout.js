import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { NavigationProvider } from "../context/NavigationContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import CustomCursor from "../components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Syed Sohail Ahmed | Backend & AWS Specialist",
  description: "Portfolio of Syed Sohail Ahmed - Full-Stack Developer specializing in the MERN Stack, Python, and Cloud technologies. View my projects, skills, and experience.",
  openGraph: {
    title: "Syed Sohail Ahmed - Portfolio",
    description: "Backend Developer & AWS Specialist. Check out my latest projects and technical skills.",
    url: "https://syedsohail.com", // Replace with your actual domain when deployed
    siteName: "Syed Sohail Ahmed Portfolio",
    images: [
      {
        url: "/assests/sohail-1.jpeg",
        width: 800,
        height: 600,
        alt: "Syed Sohail Ahmed - Backend Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Sohail Ahmed | Backend Developer",
    description: "Full-Stack Developer specializing in Node.js, Python, and AWS.",
    images: ["/assests/sohail-1.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <NavigationProvider>
            <CustomCursor />
            <LoadingScreen />
            <Navbar />
            {children}
            <Footer />
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
