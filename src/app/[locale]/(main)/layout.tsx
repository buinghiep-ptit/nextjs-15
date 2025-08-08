import MainHeader from "@/components/layout/header/main-header";
import Footer from "@/components/layout/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainHeader />
      {children}
      <Footer />
    </>
  );
}
