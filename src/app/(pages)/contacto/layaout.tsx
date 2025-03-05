import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - Make Renders",
  description: "By Make Renders",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
