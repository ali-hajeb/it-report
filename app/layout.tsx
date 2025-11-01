import type { Metadata } from "next";
import { createTheme, MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import "vazirmatn/Vazirmatn-font-face.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "IT Report Sofware",
  description: "سامانه گزارش‌های IT",
};

// @ts-ignore
const theme = createTheme({
    primaryColor: 'violet'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="fa" dir="rtl">
            <body>
                <MantineProvider theme={theme}>
                    {children}
                </MantineProvider>
            </body>
        </html>
  );
}
