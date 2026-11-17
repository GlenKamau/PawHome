import SpeciesCards from "../components/home/SpeciesCards";
import FeaturedPets from "../components/home/FeaturedPets";
import HowItWorks from "../components/home/HowItWorks";
import CallToAction from "../components/home/CallToAction";

// The header and footer come from Layout, so this page only holds the sections in the middle
export default function HomePage() {
  return (
    <>
      <SpeciesCards />
      <FeaturedPets />
      <HowItWorks />
      <CallToAction />
    </>
  );
}