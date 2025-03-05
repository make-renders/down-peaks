import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Departamentos Space 3D",
  description: "By Make Renders",
};

export default function UnitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
