import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/components/ui/Toast";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#0A0A0A]">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </ToastProvider>
    </CartProvider>
  );
}
