
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import AdoptionForm from "../components/adoption/AdoptionForm";

export default function AdoptionPage() {

  const { id } = useParams();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    if (!id) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/pets/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pet not found.");
        }

        return response.json();
      })
      .then((data) => {
        setPet(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

  }, [id]);

  async function handleSubmit(formData) {

    const response = await fetch("http://localhost:3000/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        applicationDate: new Date().toISOString(),
        status: "pending",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit your application.");
    }

    return await response.json();
  }

  if (!id) {
    return <Navigate to="/pets" replace />;
  }

  if (loading) {
    return (
      <p className="p-8 text-center">
        Loading adoption information...
      </p>
    );
  }

  if (error || !pet) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Pet not found
        </h2>

        <p className="mt-2 text-gray-600">
          {error || "This pet could not be found."}
        </p>

        <a
          href="/pets"
          className="mt-4 inline-block font-semibold text-teal-deep underline"
        >
          Back to pets
        </a>
      </div>
    );
  }

  if ((pet.status ?? "available") !== "available") {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-ink">
          Pet unavailable
        </h2>

        <p className="mt-2 text-gray-600">
          This pet is currently unavailable for adoption.
        </p>
      </div>
    );
  }

  return (
    <AdoptionForm
      pet={pet}
      onSubmit={handleSubmit}
    />
  );
}
