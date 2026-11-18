
import AddForm from "../components/Create/AddForm";

export default function PetCreatePage() {

  function handlePetAdded(newPet) {
    console.log("New pet added:", newPet);
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">

      <AddForm onPetAdded={handlePetAdded} />

    </section>
  );
}
