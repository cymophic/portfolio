import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import ComingSoon from "@/components/ui/ComingSoon";
import PageAnimator from "@/components/ui/PageAnimator";
import Breadcrumb from "@/components/ui/Breadcrumb";

const SITE_MODE = process.env.NEXT_PUBLIC_SITE_MODE;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  if (SITE_MODE === "coming_soon") {
    return (
      <main className="flex flex-1 flex-col">
        <ComingSoon />
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col mt-24 py-18">
        <PageAnimator>
          <div className="flex justify-center -mt-20 mb-20">
            <Breadcrumb />
          </div>
          {children}
        </PageAnimator>
      </main>
      <Footer />
    </>
  );
}