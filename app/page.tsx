import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Integrations from "@/components/integrations";
import Features from "@/components/features";
import Comparison from "@/components/comparison";
import Waitlist from "@/components/waitlist";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Integrations />
        <Features />
        <Comparison />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
