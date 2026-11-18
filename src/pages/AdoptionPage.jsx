
import { useParams, Link } from "react-router-dom";
import AdoptionForm from "../components/adoption/AdoptionForm";
import { getPet } from "../components/PetDetails/Pets";

export default function AdoptionPage() {
  // Get the pet ID from the URL
  const { id } = useParams();

  // Fetch the selected pet
  const pet = getPet(id);

  // Check whether the pet exists
  if (!pet) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Pet not found</h1>
        <p className="mt-3 text-gray-600">
          The pet you want to adopt does not exist or is unavailable.
        </p>
        <Link
          to="/pets"
          className="mt-5 inline-block text-[#176965] underline"
        >
          Back to pets
        </Link>
      </div>
    );
  }

  return (
    <AdoptionForm pet={pet} />
  );
}
