import "./globals.css";
import { Prompt } from 'next/font/google'

const prompt = Prompt({ subsets: ['thai'], weight: "200",})


export const metadata = {
  title: "Dynamic Landslide Chiang Mai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={prompt.className}>{children}</body>
    </html>
  );
}
