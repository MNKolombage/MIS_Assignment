import "./globals.css";
import Chatbot from "../components/Chatbot";
import HeaderFooterWrapper from "../components/HeaderFooterWrapper";

export const metadata = {
  title: "Nisala Villa",
  description: "Welcome to Nisala Villa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex flex-col min-h-screen">
        {/* Header/Footer automatically added except on admin pages */}
        <HeaderFooterWrapper>{children}</HeaderFooterWrapper>
        <Chatbot />
      </body>
    </html>
  );
}
