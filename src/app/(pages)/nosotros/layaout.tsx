import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | Space 3D",
  description: "By Make Renders",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
