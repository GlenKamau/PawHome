import { useEffect, useState } from "react";
import { Heart, PawPrint, X } from "lucide-react";
import { Link } from "react-router-dom";
import { getPets } from "../../api/pets";
import { useFavorites } from "../../hooks/useFavorites";

function PetImage({ pet }) {
  const [failed, setFailed] = useState(false);
  const image = pet.photoUrl ?? pet.images?.[0];

  if (!image || failed) {
    return (
      <div className="flex h-52 items-center justify-center bg-teal-tint text-teal-deep">
        <PawPrint size={60} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={`${pet.name}, a ${pet.breed}`}
      onError={() => setFailed(true)}
      className="h-52 w-full object-cover"
    />
  );
}

export default function Favorites() {
  const [pets, setPets] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { ids, loading, toggle } = useFavorites();

  useEffect(() => {
    let active = true;
    getPets()
      .then((all) => active && setPets(all))
      .catch((requestError) => active && setError(requestError.message));

    return () => {
      active = false;
    };
  }, []);

  async function handleRemove(id) {
    setMessage("");
    const saved = await toggle(id);
    if (!saved) setMessage("Couldn't remove that favorite. Try again.");
  }

  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800" role="alert">
          <h1 className="text-2xl font-bold">Your favorites</h1>
          <p className="mt-2">Could not load pets: {error}. Check that the API server is running.</p>
        </div>
      </main>
    );
  }

  if (loading || pets === null) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <p role="status" className="text-ink-soft">Loading your favorites...</p>
      </main>
    );
  }

  const favorites = pets.filter((pet) => ids.includes(pet.id));

  if (favorites.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="rounded-2xl border border-dashed border-ivory-deep bg-card px-6 py-14 text-center">
          <Heart className="mx-auto text-teal-deep" size={48} aria-hidden="true" />
          <h1 className="mt-5 text-4xl font-bold tracking-tight">Your favorites</h1>
          <p className="mx-auto mt-3 max-w-md leading-7 text-ink-soft">No favorites yet. Tap the heart on any pet to save it here.</p>
          <Link to="/pets" className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-coral px-5 py-3 font-semibold text-ink hover:bg-coral-dark">Browse pets</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-deep">Saved companions</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight">Your favorites</h1>
          <p className="mt-2 text-ink-soft">The pets you would like to meet.</p>
        </div>
        <Heart className="text-teal-deep" size={36} fill="currentColor" aria-hidden="true" />
      </div>

      {message && <p role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{message}</p>}

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((pet) => (
          <li key={pet.id} className="overflow-hidden rounded-xl border border-ivory-deep bg-card shadow-sm transition hover:border-coral hover:shadow-md">
            <PetImage pet={pet} />
            <div className="flex items-start justify-between gap-3 p-4">
              <div>
                <Link to={`/pets/${pet.id}`} className="text-xl font-semibold text-ink hover:text-teal-deep">{pet.name}</Link>
                <p className="mt-1 text-sm text-ink-soft">{pet.breed}</p>
                <p className="mt-1 text-sm text-ink-soft">{pet.age ?? pet.ageYears ?? "Age not listed"}{pet.ageYears ? ` ${pet.ageYears === 1 ? "year" : "years"} old` : ""}</p>
              </div>
              <button type="button" onClick={() => handleRemove(pet.id)} aria-label={`Remove ${pet.name} from favorites`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-teal-deep hover:bg-teal-tint hover:text-teal-dark"><X size={20} aria-hidden="true" /></button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}