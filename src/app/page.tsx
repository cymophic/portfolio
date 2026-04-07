import ComingSoon from "@/components/pages/ComingSoon";

const IS_LIVE = false;

export default function Home() {
  if (!IS_LIVE) {
    return <ComingSoon />;
  }
  return <div>Home page coming soon</div>;
}