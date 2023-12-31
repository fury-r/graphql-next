import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/global.css";
import { BiLogoGraphql } from "react-icons/bi";
const inter = Inter({ subsets: ["latin"] });
import { Amplify } from "aws-amplify";
import awsExports from "@src/aws-exports";

Amplify.configure(awsExports, {
  ssr: true,
  API: {
    GraphQL: {
      withCredentials: true,
    },
  },
});
export const metadata: Metadata = {
  title: "Graphql-Next",
  description: "Generated by create next app",
  icons: BiLogoGraphql,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
