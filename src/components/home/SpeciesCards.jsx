import { useState } from "react";
import { Link } from "react-router-dom";
import { Bird, Cat, Dog, Rabbit } from "lucide-react";

// Put these photos in public/images/species/ (about 800x600 works well)
const SPECIES = [
  {
    species: "dog",
    label: "Dogs",
    Icon: Dog,
    image: "/images/species/dogs.jpg",
    text: "Playful, loyal and always happy to see you.",
  },
  {
    species: "cat",
    label: "Cats",
    Icon: Cat,
    image: "/images/species/cats.jpg",
    text: "Calm companions who love a quiet lap.",
  },
  {
    species: "rabbit",
    label: "Rabbits",
    Icon: Rabbit,
    image: "/images/species/rabbits.jpg",
    text: "Gentle, curious and great in small homes.",
  },
  {
    species: "bird",
    label: "Birds",
    Icon: Bird,
    image: "/images/species/birds.jpg",
    text: "Bright, chatty friends who fill a room with song.",
  },
];

function SpeciesCard({ species, label, Icon, image, text }) {
  // Local state: did the photo fail to load? If so, show an icon block instead
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <li>
      <Link
        to={`/pets?species=${species}`}
        className="group block overflow-hidden rounded-xl border border-ivory-deep bg-card hover:border-coral transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-deep"
      >
        {imageFailed ? (
          <div className="flex h-44 items-center justify-center bg-teal-tint text-teal-deep">
            <Icon size={56} aria-hidden="true" />
          </div>
        ) : (
          <img
            src={image}
            alt=""
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-44 w-full object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-ink group-hover:text-teal-deep">
            {label}
          </h3>
          <p className="mt-1 text-sm leading-6 text-ink-soft">{text}</p>
        </div>
      </Link>
    </li>
  );
}

export default function SpeciesCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-5xl">
        Find your new best friend
      </h1>
      <p className="mt-3 max-w-xl text-base leading-7 text-ink-soft">
        Start with the kind of pet you have in mind. You can narrow it down by
        size, age and more on the next page.
      </p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SPECIES.map((s) => (
          <SpeciesCard key={s.species} {...s} />
        ))}
      </ul>
    </section>
  );
}
