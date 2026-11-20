import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000/pets";

const SECONDS_PER_PET = 6;

const css = `
@keyframes pawhome-slide-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
.pawhome-slide { animation: pawhome-slide-right linear infinite; }
@media (prefers-reduced-motion: reduce) { .pawhome-slide { animation: none; } }
`;

export default function PetSlideshow() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load the pets from json-server once, when the section appears
  useEffect(() => {
    let cancelled = false;
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => !cancelled && setPets(data))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const slides = useMemo(() => {
    const seen = new Set();
    return pets.filter((p) => {
      if (!p.image || p.status === "adopted" || seen.has(p.image)) return false;
      seen.add(p.image);
      return true;
    });
  }, [pets]);

  const track = useMemo(() => {
    if (slides.length === 0) return [];
    let row = slides;
    while (row.length < 8) row = [...row, ...slides];
    return [...row, ...row];
  }, [slides]);
  const half = track.length / 2;

  return (
    <section
      id="our-pets"
      aria-labelledby="slideshow-title"
      className="scroll-mt-16 overflow-hidden bg-ivory-deep/60 py-12 sm:py-16"
    >
      <style>{css}</style>

      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-3 px-4">
        <div>
          <h2
            id="slideshow-title"
            className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Meet the pets waiting for a home
          </h2>
          <p className="mt-2 max-w-xl text-ink-soft">
            Here are some of the friends looking for a family. Hover to pause,
            and click one to learn more.
          </p>
        </div>
        <Link
          to="/pets"
          className="text-sm font-semibold text-teal-deep underline underline-offset-4 hover:text-teal-dark"
        >
          See all pets
        </Link>
      </div>

      {loading && (
        <div
          className="mt-8 flex gap-5 overflow-hidden px-4"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-4/5 w-56 shrink-0 animate-pulse rounded-2xl bg-ivory-deep sm:w-64"
            />
          ))}
        </div>
      )}

      {error && (
        <p
          role="alert"
          className="mx-auto mt-8 max-w-6xl px-4 text-sm text-ink-soft"
        >
          We could not load the pets right now. Check that the database is
          running.
        </p>
      )}

      {!loading && !error && slides.length === 0 && (
        <p className="mx-auto mt-8 max-w-6xl px-4 text-ink-soft">
          No pets to show yet. Please check back soon.
        </p>
      )}

      {track.length > 0 && (
        <div className="group mt-8 mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <ul
            className="pawhome-slide flex w-max group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
            style={{ animationDuration: `${half * SECONDS_PER_PET}s` }}
          >
            {track.map((pet, i) => {
              const isCopy = i >= half;
              return (
                <li
                  key={`${pet.id}-${i}`}
                  aria-hidden={isCopy || undefined}
                  className="w-56 shrink-0 pr-5 sm:w-64"
                >
                  <Link
                    to={`/pets/${pet.id}`}
                    tabIndex={isCopy ? -1 : undefined}
                    className="group/card relative block aspect-4/5 overflow-hidden rounded-2xl bg-card shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-deep"
                  >
                    <img
                      src={pet.image}
                      alt={
                        isCopy
                          ? ""
                          : `${pet.name}${pet.breed ? `, ${pet.breed}` : ""}`
                      }
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-ink/75 px-4 py-3">
                      <p className="font-heading text-lg font-semibold text-ivory">
                        {pet.name}
                      </p>
                      <p className="truncate text-sm text-ivory/85">
                        {pet.breed || pet.description}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
