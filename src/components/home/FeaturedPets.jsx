import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";
import { usePets } from "../../context/PetsContext";

// Temporary card. Swap for Tevin's PetCard when it is merged.
function PetPreview({ pet }) {
  const cover = pet.images?.[0];
  // Local state: did the photo fail to load?
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <li>
      <Link
        to={`/pets/${pet.id}`}
        className="group block overflow-hidden rounded-xl border border-ivory-deep bg-card hover:border-coral transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-deep"
      >
        {!cover || imageFailed ? (
          <div className="flex h-56 items-center justify-center bg-teal-tint text-teal-deep">
            <PawPrint size={56} aria-hidden="true" />
          </div>
        ) : (
          <img
            src={cover}
            alt={`${pet.name}, a ${pet.breed}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-56 w-full object-cover"
          />
        )}
        <div className="flex items-start justify-between gap-3 p-4">
          <div>
            <h3 className="text-lg font-semibold text-ink group-hover:text-teal-deep">
              {pet.name}
            </h3>
            <p className="text-sm text-ink-soft">
              {pet.breed}, {pet.ageYears}{" "}
              {pet.ageYears === 1 ? "year" : "years"} old
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-teal-tint px-2.5 py-1 text-xs font-semibold text-teal-deep">
            Available
          </span>
        </div>
      </Link>
    </li>
  );
}

export default function FeaturedPets() {
  // Shared state (Context): all pets, plus loading and error
  const { pets, loading, error } = usePets();

  // Derived state: the first 3 available pets. Calculated, not stored.
  const featured = useMemo(
    () => pets.filter((p) => p.status === "available").slice(0, 3),
    [pets],
  );

  return (
    <section className="bg-ivory-deep/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Pets waiting for a home
          </h2>
          <Link
            to="/pets"
            className="text-sm font-medium text-teal-deep underline underline-offset-4 hover:text-teal-dark"
          >
            See all pets
          </Link>
        </div>

        {loading && <p className="mt-8 text-ink-soft">Loading pets...</p>}

        {error && (
          <p
            role="alert"
            className="mt-8 rounded-md bg-red-50 p-4 text-sm text-red-800"
          >
            We could not load the pets: {error}. Check that the database is
            running (npm run api).
          </p>
        )}

        {!loading && !error && featured.length === 0 && (
          <p className="mt-8 text-ink-soft">
            No pets are available right now. Please check back soon.
          </p>
        )}

        {featured.length > 0 && (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((pet) => (
              <PetPreview key={pet.id} pet={pet} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
