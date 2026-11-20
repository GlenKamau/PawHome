import { useState } from "react";
import { Heart, PawPrint, X } from "lucide-react";
import { Link } from "react-router-dom";
import { getPets } from "./Pets";
import { toggleFavoriteId } from "./Favourites";


function PetImage({ pet }) {
  const [failed, setFailed] = useState(false);

  if (!pet.image || failed) {
    return (
      <div className="flex h-52 items-center justify-center bg-teal-tint text-teal-deep">
        <PawPrint size={60} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={pet.image}
      alt={`${pet.name}, a ${pet.breed}`}
      onError={() => setFailed(true)}
      className="h-52 w-full object-cover"
    />
  );
}

export default function Favorite({ favoriteIds, onFavoriteIdsChange }) {
  const favorites = getPets().filter((pet) => favoriteIds.includes(pet.id));

  function handleRemove(id) {
    onFavoriteIdsChange(toggleFavoriteId(id));
  }

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
          <h1 className="text-4xl font-bold tracking-tight">Your favorites</h1>
          <p className="mt-2 text-ink-soft">The pets you would like to meet.</p>
        </div>
        <Heart className="text-teal-deep" size={36} fill="currentColor" aria-hidden="true" />
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((pet) => (
          <li key={pet.id} className="overflow-hidden rounded-xl border border-ivory-deep bg-card shadow-sm transition hover:border-coral hover:shadow-md">
            <PetImage pet={pet} />
            <div className="flex items-start justify-between gap-3 p-4">
              <div>
                <Link to={`/pets/${pet.id}`} className="text-xl font-semibold text-ink hover:text-teal-deep">{pet.name}</Link>
                <p className="mt-1 text-sm text-ink-soft">{pet.breed}</p>
                <p className="mt-1 text-sm text-ink-soft">{pet.age}</p>
              </div>
              <button type="button" onClick={() => handleRemove(pet.id)} aria-label={`Remove ${pet.name} from favorites`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-teal-deep hover:bg-teal-tint hover:text-teal-dark"><X size={20} aria-hidden="true" /></button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}