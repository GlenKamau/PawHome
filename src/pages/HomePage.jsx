import Hero from "../components/home/Hero";
import PetSlideshow from "../components/home/PetSlideshow";
import HowItWorks from "../components/home/HowItWorks";
import CallToAction from "../components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PetSlideshow />
      <div id="how-it-works" className="scroll-mt-16">
        <HowItWorks />
      </div>
      <CallToAction />
    </>
  );
}
