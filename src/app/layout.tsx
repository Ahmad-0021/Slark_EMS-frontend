import AppProvider from "./AppProvider";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <html>
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </AppProvider>
  );
}
