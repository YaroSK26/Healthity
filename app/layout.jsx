import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from "../components/NavBar";
import { ToasterProvider } from '../components/ToastProvider';
import { ClerkProvider } from "@clerk/nextjs";
import Footer from '../components/Footer';
import { CrispProvider } from '../components/CrispProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Healthity",
  description: "App that helps you stay fit",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <NavBar></NavBar>
          {children}
          
          <CrispProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
