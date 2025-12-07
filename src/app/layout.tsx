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
    primaryColor: 'violet',
    fontFamily: 'Vazirmatn'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="fa" dir="rtl">
            <body
                style={{background: 'linear-gradient(60deg, rgb(190 75 219) 0%, rgb(112, 72, 232) 100%)'}}
            >
                <MantineProvider theme={theme}>
                    {children}
                </MantineProvider>
            </body>
        </html>
  );
}
