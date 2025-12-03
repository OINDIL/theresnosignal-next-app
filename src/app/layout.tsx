import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const myFont = localFont({
  src: "../../public/fonts/font-custom.ttf",
});

export const metadata: Metadata = {
  title: "VWB",
  description: "VWB - Experimental Music & Sound Art Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${myFont.className} antialiased`}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  // Only accept valid theme values to prevent XSS via localStorage manipulation
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'bright' || !theme) {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // Silently fail if localStorage is unavailable (e.g., in private browsing)
                }
              })();
            `,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
