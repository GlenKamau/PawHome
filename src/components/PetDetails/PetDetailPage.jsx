
import { useEffect, useState } from "react";
import { ArrowLeft, Heart, PawPrint, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toggleFavoriteId } from "./Favourites";

function PetPhoto({ pet, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!pet.image || failed) {
    return (
      <div className={`flex items-center justify-center bg-teal-tint text-teal-deep ${className}`}>
        <PawPrint size={76} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={pet.image}
      alt={`${pet.name}, a ${pet.breed || "pet"}`}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

export default function PetDetailPage({
  favoriteIds = [],
  onFavoriteIdsChange,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/pets")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load pets.");
        }
        return response.json();
      })
      .then((data) => {
        setAllPets(data);

        const selectedPet = data.find(
          (item) => String(item.id) === String(id)
        );

        setPet(selectedPet || null);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Unable to load pet details. Please try again.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <p className="p-8 text-center">
        Loading pet details...
      </p>
    );
  }

  if (message && !pet) {
    return (
      <p className="p-8 text-center text-red-600">
        {message}
      </p>
    );
  }

  if (!pet) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-xl border border-ivory-deep bg-card p-6 text-ink-soft">

          <h1 className="text-3xl font-bold text-ink">
            Pet not found
          </h1>

          <p className="mt-2">
            This pet may have been adopted or removed.
          </p>

          <Link
            to="/pets"
            className="mt-5 inline-flex font-semibold text-teal-deep underline"
          >
            Back to pets
          </Link>

        </div>
      </section>
    );
  }

  const fav = favoriteIds.includes(pet.id);

  const otherPets = allPets.filter(
    (other) =>
      String(other.id) !== String(pet.id) &&
      other.status !== "adopted"
  );
  const sameBreed = otherPets.filter(
    (other) =>
      pet.breed &&
      other.breed &&
      other.breed.trim().toLowerCase() === pet.breed.trim().toLowerCase()
  );
  const sameSpecies = pet.species
    ? otherPets.filter(
        (other) =>
          other.species?.toLowerCase() === pet.species.toLowerCase()
      )
    : [];
  const hasSimilarMatches = sameBreed.length > 0 || sameSpecies.length > 0;
  const similar = (sameBreed.length > 0
    ? sameBreed
    : sameSpecies.length > 0
      ? sameSpecies
      : otherPets
  ).slice(0, 3);

  const isAvailable =
    (pet.status ?? "available") === "available";

  function handleHeart() {
    setMessage("");

    try {
      if (onFavoriteIdsChange) {
        onFavoriteIdsChange(toggleFavoriteId(pet.id));
      }
    } catch {
      setMessage("Couldn't update your favorites. Try again.");
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Are you sure you want to delete ${pet.name}?`)) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/pets/${pet.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Delete failed.");
      }

      navigate("/pets");
    } catch {
      setMessage("Couldn't delete this pet. Try again.");
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">

      <Link
        to="/pets"
        className="inline-flex items-center gap-2 text-sm font-semibold text-teal-deep"
      >
        <ArrowLeft size={17} />
        Back to list
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">

        <PetPhoto
          pet={pet}
          className="min-h-80 w-full rounded-2xl border border-ivory-deep bg-card sm:min-h-[30rem]"
        />

        <div>

          <div className="flex items-start justify-between gap-4">

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {pet.name}
              </h1>

              <p className="mt-2 text-lg text-ink-soft">
                {pet.breed}
              </p>
            </div>

            <button
              type="button"
              onClick={handleHeart}
              aria-pressed={fav}
              aria-label={fav ? "Remove from favorites" : "Add to favorites"}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory-deep bg-card text-teal-deep hover:bg-teal-tint"
            >
              <Heart
                size={24}
                fill={fav ? "currentColor" : "none"}
              />
            </button>

          </div>

          {message && (
            <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-800">
              {message}
            </p>
          )}

          <dl className="mt-8 grid grid-cols-2 gap-4 rounded-xl bg-card p-5">

            <div>
              <dt className="text-sm text-ink-soft">Breed</dt>
              <dd className="mt-1 font-semibold">{pet.breed || "Not listed"}</dd>
            </div>

            <div>
              <dt className="text-sm text-ink-soft">Age</dt>
              <dd className="mt-1 font-semibold">{pet.age || "Not listed"}</dd>
            </div>

            <div>
              <dt className="text-sm text-ink-soft">Gender</dt>
              <dd className="mt-1 font-semibold">{pet.gender || "Not listed"}</dd>
            </div>

            <div>
              <dt className="text-sm text-ink-soft">Adoption fee</dt>
              <dd className="mt-1 font-semibold">
                {pet.adoptionFee != null
                  ? `$${pet.adoptionFee}`
                  : "Not listed"}
              </dd>
            </div>

          </dl>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-ink">
              About {pet.name}
            </h2>

            <p className="mt-2 leading-7 text-ink-soft">
              {pet.description || "No description available."}
            </p>
          </div>

          {pet.shelter && (
            <div className="mt-6 rounded-xl border border-ivory-deep p-4">
              <h2 className="font-semibold">Shelter</h2>
              <p className="mt-1 text-ink-soft">{pet.shelter}</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">

            {isAvailable && (
              <Link
                to={`/pets/${pet.id}/adopt`}
                className="inline-flex min-h-11 items-center rounded-lg bg-coral px-5 py-3 font-semibold text-ink hover:bg-coral-dark"
              >
                Adopt
              </Link>
            )}

            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-red-200 bg-card px-5 py-3 font-semibold text-red-700 hover:bg-red-50"
            >
              <Trash2 size={17} />
              Delete
            </button>

          </div>

        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-16 border-t border-ivory-deep pt-10">

          <h2 className="text-2xl font-bold text-ink">
            {hasSimilarMatches ? "Similar pets" : "More pets looking for a home"}
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {similar.map((other) => (
              <Link
                key={other.id}
                to={`/pets/${other.id}`}
                className="group overflow-hidden rounded-xl border border-ivory-deep bg-card transition hover:border-coral hover:shadow-md"
              >
                <PetPhoto pet={other} className="h-44 w-full" />

                <div className="p-4">
                  <h3 className="text-lg font-semibold group-hover:text-teal-deep">
                    {other.name}
                  </h3>

                  <p className="mt-1 text-sm text-ink-soft">
                    {other.breed}
                  </p>
                </div>

              </Link>
            ))}

          </div>
        </section>
      )}

    </main>
  );
}
