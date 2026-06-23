import { Metadata } from "next";
import {UsuarioProvider} from '@/context/UsuarioProvider'
import "./globals.css";

export const metadata: Metadata = {
  title: 'Home',
  description: 'Site do vectra prime',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>

         <UsuarioProvider>
        {children}
         </UsuarioProvider>

        </body>
    </html>
  );
}
