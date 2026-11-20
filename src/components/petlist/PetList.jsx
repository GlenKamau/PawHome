
import { useEffect, useState } from "react";
import PetCard from "./PetCard";

export default function PetList() {

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchPets() {
    try {
      setError("");

      const response = await fetch("http://localhost:3000/pets");

      if (!response.ok) {
        throw new Error("Failed to fetch pets.");
      }

      const data = await response.json();

      setPets(data);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    fetchPets();

    // Refresh pets when the page becomes visible
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        fetchPets();
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };

  }, []);

  if (loading) {
    return (
      <p className="p-8 text-center text-ink-soft">
        Loading pets...
      </p>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">{error}</p>

        <button
          onClick={fetchPets}
          className="mt-4 rounded-lg bg-teal-deep px-5 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">

      <h1 className="mb-8 text-center text-3xl font-bold text-ink">
        Pets Available for Adoption
      </h1>

      {pets.length === 0 ? (

        <p className="text-center text-ink-soft">
          No pets available at the moment.
        </p>

      ) : (

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {pets.map((pet) => (

            <PetCard
              key={pet.id}
              id={pet.id}
              name={pet.name}
              description={pet.description}
              image={pet.image}
              breed={pet.breed}
              age={pet.age}
              status={pet.status || "available"}
            />

          ))}

        </div>

      )}

    </main>
  );
}
