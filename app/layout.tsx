import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZenWay",
  description: "Your healthy commute companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-[var(--color-background)] to-[#E6F7F7]">
        {children}
      </body>
    </html>
  );
}
