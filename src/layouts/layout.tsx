import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
  mainClassName?: string;
};

const Layout = ({ children, showHero = false, mainClassName }: Props) => {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_34%),linear-gradient(180deg,#fff7ed_0%,#ffffff_38%,#fff7ed_100%)]">
      <Header />
      {showHero && <Hero />}
      <main
        className={cn("container mx-auto flex-1 py-10", mainClassName)}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
