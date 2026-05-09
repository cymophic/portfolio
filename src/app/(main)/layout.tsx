import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import ComingSoon from "@/app/coming-soon";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ComingSoon>
      <Header />
      <main className="flex flex-1 flex-col mt-24 py-18">
        <div className="flex justify-center -mt-20 mb-20">
          <Breadcrumb />
        </div>
        {children}
      </main>
      <Footer />
    </ComingSoon>
  );
}
