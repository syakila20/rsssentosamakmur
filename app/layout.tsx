import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-linear-to-br from-fuchsia-50 to-teal-50">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
